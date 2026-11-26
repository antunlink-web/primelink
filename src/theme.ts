import { useSyncExternalStore } from 'react'

/**
 * Site theme: 'light' (default for a first visit) | 'dark' | 'system'. The inline script in
 * index.html applies the stored preference before CSS loads and follows the device while in
 * 'system' mode; this module lets the UI read and change it. Keep the two in sync.
 * Every choice is stored explicitly, because nothing stored means light.
 */
export type ThemePref = 'light' | 'dark' | 'system'
export type Theme = 'light' | 'dark'

const KEY = 'primelink-site-theme'
const COLORS: Record<Theme, string> = { light: '#fdfefe', dark: '#0f131b' }
const EVENT = 'primelink-theme'

export function getPref(): ThemePref {
  try {
    const v = window.localStorage.getItem(KEY)
    return v === 'dark' || v === 'system' ? v : 'light'
  } catch {
    return 'light'
  }
}

export function getTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

function apply(pref: ThemePref) {
  const theme: Theme = pref === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : pref
  document.documentElement.setAttribute('data-theme', theme)
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
    m.content = pref === 'system' ? COLORS[(m.getAttribute('media') || '').includes('dark') ? 'dark' : 'light'] : COLORS[theme]
  })
}

export function setPref(pref: ThemePref) {
  try {
    window.localStorage.setItem(KEY, pref)
  } catch {
    /* storage blocked: the choice still applies for this page view */
  }
  // An immediate switch also respects reduced motion; no transition framework needed here.
  apply(pref)
  window.dispatchEvent(new window.Event(EVENT))
}

function subscribe(cb: () => void) {
  const mo = new window.MutationObserver(cb) // device changes in 'system' mode are applied by the inline script
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  window.addEventListener(EVENT, cb)
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY || e.key === null) {
      apply(getPref())
      cb()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    mo.disconnect()
    window.removeEventListener(EVENT, cb)
    window.removeEventListener('storage', onStorage)
  }
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, () => 'light' as const)
}

export function useThemePref(): ThemePref {
  return useSyncExternalStore(subscribe, getPref, () => 'light' as const)
}

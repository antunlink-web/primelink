import { useSyncExternalStore } from 'react'

/**
 * The site has two explicit themes. The inline script in index.html applies the stored choice
 * before CSS loads; when nothing valid is stored, both layers resolve to light.
 */
export type ThemePref = 'light' | 'dark'
export type Theme = 'light' | 'dark'

const KEY = 'primelink-site-theme'
const COLORS: Record<Theme, string> = { light: '#fdfefe', dark: '#0f131b' }
const EVENT = 'primelink-theme'

export function getPref(): ThemePref {
  try {
    const v = window.localStorage.getItem(KEY)
    return v === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function getTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

function apply(pref: ThemePref) {
  document.documentElement.setAttribute('data-theme', pref)
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
    m.content = COLORS[pref]
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
  window.addEventListener(EVENT, cb)
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY || e.key === null) {
      apply(getPref())
      cb()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
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

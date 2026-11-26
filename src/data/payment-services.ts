import type { ServiceDetail } from "./services";

// Payment pages share the existing flat routes and language switcher.
export const paymentServices = {
  "hr": [
    {
      "slug": "integracije-karticnog-placanja",
      "navTitle": "Integracije kartičnog plaćanja",
      "icon": "credit-card",
      "h1": "Integracije kartičnog plaćanja",
      "seoTitle": "Integracije kartičnog plaćanja: Stripe, Corvus i Monri | PrimeLink",
      "seoDescription": "Integracija sustava za online plaćanje: Stripe, Corvus i Monri.",
      "hero": "Povezujemo web stranice, web trgovine i aplikacije sa sustavima Stripe, Corvus i Monri. Rješenje prilagođavamo vašem poslovanju i odabranom pružatelju usluge plaćanja.",
      "forWhom": [
        "Web stranice koje trebaju online naplatu usluga",
        "Web trgovine koje uvode ili mijenjaju sustav plaćanja",
        "Aplikacije s naplatom prilagođenom poslovnom modelu"
      ],
      "includes": [
        "Analizu zahtjeva i pomoć pri odabiru pružatelja",
        "Povezivanje odabranog sustava s vašom stranicom ili aplikacijom",
        "Testiranje dogovorenih scenarija i statusa plaćanja",
        "Podršku pri lansiranju i upute za vaš tim"
      ],
      "useCases": [
        "Jednokratna online plaćanja",
        "Pretplate i donacije, ovisno o pružatelju i dogovorenom opsegu",
        "Obročno plaćanje, ovisno o pružatelju i dogovorenom opsegu",
        "Marketplace funkcije, ovisno o pružatelju i dogovorenom opsegu"
      ],
      "process": [
        {
          "title": "Zahtjevi i odabir pružatelja",
          "description": "Definiramo model naplate, potrebne funkcije i uvjete odabranog pružatelja: Stripe, Corvus ili Monri."
        },
        {
          "title": "Integracija",
          "description": "Povezujemo sustav plaćanja s web stranicom, trgovinom ili aplikacijom i obrađujemo dogovorene statuse plaćanja."
        },
        {
          "title": "Testiranje",
          "description": "Provjeravamo uspješna, odbijena i prekinuta plaćanja te povrate i druge scenarije u dogovorenom opsegu."
        },
        {
          "title": "Podrška pri lansiranju",
          "description": "Pomažemo pri prelasku u produkciju, provjeri početnih transakcija i predaji uputa vašem timu."
        }
      ],
      "body": [
        "Imamo iskustvo uspješnih integracija sustava Stripe, Corvus i Monri. Na temelju tog iskustva planiramo povezivanje s vašim postojećim sustavom i poslovnim procesima.",
        "Mogućnosti se razlikuju prema pružatelju, ugovoru i tržištu. Pretplate, donacije, obročno plaćanje i marketplace funkcije provjeravamo s odabranim pružateljem i uključujemo samo u dogovorenom opsegu.",
        "Naknade i uvjete određuje odabrani pružatelj usluge plaćanja. Prije razvoja dogovaramo tehnički opseg, odgovornosti i zahtjeve za rukovanje podacima."
      ],
      "related": [
        "stripe-integracije"
      ],
      "cta": "Zatražite ponudu za integraciju kartičnog plaćanja"
    },
    {
      "slug": "stripe-integracije",
      "navTitle": "Stripe integracije",
      "icon": "credit-card",
      "h1": "Stripe integracije za web stranice i aplikacije",
      "seoTitle": "Stripe integracije za tvrtke u Hrvatskoj | PrimeLink",
      "seoDescription": "Integracija Stripe plaćanja, pretplata i Connect platformi za web stranice i aplikacije prema dogovorenom opsegu.",
      "hero": "Integriramo Stripe plaćanja u web stranice, web trgovine i aplikacije. Opseg prilagođavamo vašem modelu naplate i dostupnim Stripe mogućnostima.",
      "forWhom": [
        "Web trgovine koje su odabrale Stripe",
        "SaaS proizvodi kojima trebaju pretplate",
        "Marketplace platforme koje razmatraju Stripe Connect"
      ],
      "includes": [
        "Analizu modela naplate i Stripe konfiguracije",
        "Integraciju Checkout ili Elements sučelja prema potrebama projekta",
        "Obradu webhookova i sinkronizaciju statusa s vašim sustavom",
        "Testiranje i podršku pri lansiranju"
      ],
      "useCases": [
        "Jednokratna naplata usluge ili narudžbe",
        "Pretplate i korisnički portal prema dogovorenom opsegu",
        "Donacije prema dostupnim mogućnostima i dogovorenom opsegu",
        "Stripe Connect za marketplace, uz provjeru uvjeta i dogovoreni opseg"
      ],
      "process": [
        {
          "title": "Analiza modela naplate",
          "description": "Definiramo zahtjeve i provjeravamo odgovara li Stripe vašem poslovanju i tržištu."
        },
        {
          "title": "Integracija",
          "description": "Povezujemo Stripe API, checkout i webhookove prema dogovorenom opsegu."
        },
        {
          "title": "Testiranje",
          "description": "Provjeravamo uspješna i neuspješna plaćanja, povrate i pretplatničke scenarije uključene u projekt."
        },
        {
          "title": "Podrška pri lansiranju",
          "description": "Pomažemo pri prelasku u produkciju, provjeri početnih transakcija i obuci tima."
        }
      ],
      "body": [
        "Za Stripe projekte planiramo tijek naplate, obradu webhookova i povezivanje s CRM-om ili aplikacijom. Checkout ili Elements biramo prema zahtjevima projekta.",
        "Pretplate, probna razdoblja, kuponi i korisnički portal mogu biti dio dogovorenog rješenja. Za marketplace projekte zasebno procjenjujemo Stripe Connect, uvjete računa i tokove isplata.",
        "Pretplate, donacije, obročno plaćanje i marketplace funkcije ovise o dostupnosti kod odabranog pružatelja, tržištu i dogovorenom opsegu. Naknade i ugovorne uvjete određuje pružatelj.",
        "Prije implementacije dogovaramo zahtjeve za rukovanje podacima i odgovornosti. Sigurnosne i regulatorne obveze ovise o konkretnom rješenju i poslovanju.",
        "Ako još birate pružatelja, pogledajte našu povezanu uslugu integracija kartičnog plaćanja za Stripe, Corvus i Monri."
      ],
      "related": [
        "integracije-karticnog-placanja"
      ],
      "cta": "Zatražite ponudu za Stripe integraciju"
    }
  ],
  "en": [
    {
      "slug": "integracije-karticnog-placanja",
      "navTitle": "Card payment integrations",
      "icon": "credit-card",
      "h1": "Card payment integrations",
      "seoTitle": "Card payment integrations: Stripe, Corvus and Monri | PrimeLink",
      "seoDescription": "Online payment integration: Stripe, Corvus and Monri.",
      "hero": "We connect websites, online stores and applications with Stripe, Corvus and Monri. Each integration is tailored to your business and chosen payment provider.",
      "forWhom": [
        "Websites that need online payments for services",
        "Online stores introducing or changing a payment system",
        "Applications with payments tailored to their business model"
      ],
      "includes": [
        "Requirements analysis and help with provider selection",
        "Connecting the selected system to your website or application",
        "Testing agreed scenarios and payment statuses",
        "Launch support and guidance for your team"
      ],
      "useCases": [
        "One-off online payments",
        "Subscriptions and donations, depending on the provider and agreed scope",
        "Instalments, depending on the provider and agreed scope",
        "Marketplace functions, depending on the provider and agreed scope"
      ],
      "process": [
        {
          "title": "Requirements and provider selection",
          "description": "We define the payment model, required features and terms of the selected provider: Stripe, Corvus or Monri."
        },
        {
          "title": "Integration",
          "description": "We connect the payment system to your website, store or application and handle the agreed payment statuses."
        },
        {
          "title": "Testing",
          "description": "We check successful, declined and interrupted payments, refunds and other scenarios within the agreed scope."
        },
        {
          "title": "Launch support",
          "description": "We help with the transition to production, checking initial transactions and handing over guidance to your team."
        }
      ],
      "body": [
        "We have experience successfully integrating Stripe, Corvus and Monri. We use that experience to plan the connection with your existing system and business processes.",
        "Capabilities vary by provider, contract and market. We check subscriptions, donations, instalments and marketplace functions with the selected provider and include them only within the agreed scope.",
        "Fees and terms are set by the selected payment provider. Before development, we agree on the technical scope, responsibilities and data handling requirements."
      ],
      "related": [
        "stripe-integracije"
      ],
      "cta": "Request a quote for a card payment integration"
    },
    {
      "slug": "stripe-integracije",
      "navTitle": "Stripe integrations",
      "icon": "credit-card",
      "h1": "Stripe integrations for websites and applications",
      "seoTitle": "Stripe integrations for businesses in Croatia | PrimeLink",
      "seoDescription": "Stripe payment, subscription and Connect platform integrations for websites and applications within the agreed scope.",
      "hero": "We integrate Stripe payments into websites, online stores and applications. We tailor the scope to your payment model and available Stripe capabilities.",
      "forWhom": [
        "Online stores that have chosen Stripe",
        "SaaS products that need subscriptions",
        "Marketplace platforms considering Stripe Connect"
      ],
      "includes": [
        "Payment model and Stripe configuration analysis",
        "Checkout or Elements integration based on project requirements",
        "Webhook handling and status synchronization with your system",
        "Testing and launch support"
      ],
      "useCases": [
        "One-off payments for services or orders",
        "Subscriptions and a customer portal within the agreed scope",
        "Donations subject to available capabilities and agreed scope",
        "Stripe Connect for marketplaces, subject to eligibility and agreed scope"
      ],
      "process": [
        {
          "title": "Payment model analysis",
          "description": "We define requirements and check whether Stripe fits your business and market."
        },
        {
          "title": "Integration",
          "description": "We connect the Stripe API, checkout and webhooks within the agreed scope."
        },
        {
          "title": "Testing",
          "description": "We check successful and failed payments, refunds and subscription scenarios included in the project."
        },
        {
          "title": "Launch support",
          "description": "We help with the transition to production, checking initial transactions and training your team."
        }
      ],
      "body": [
        "For Stripe projects, we plan the payment flow, webhook handling and connection to your CRM or application. We choose Checkout or Elements based on project requirements.",
        "Subscriptions, trials, coupons and a customer portal can form part of the agreed solution. For marketplace projects, we assess Stripe Connect, account requirements and payout flows separately.",
        "Subscriptions, donations, instalments and marketplace functions depend on availability with the selected provider, market and agreed scope. Fees and contractual terms are set by the provider.",
        "Before implementation, we agree on data handling requirements and responsibilities. Security and regulatory obligations depend on the specific solution and business.",
        "If you are still choosing a provider, see our related card payment integrations service for Stripe, Corvus and Monri."
      ],
      "related": [
        "integracije-karticnog-placanja"
      ],
      "cta": "Request a quote for a Stripe integration"
    }
  ]
} satisfies Record<"hr" | "en", ServiceDetail[]>;

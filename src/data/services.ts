export type ServiceDetail = {
  slug: string;
  navTitle: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  hero: string;
  icon: "globe" | "refresh" | "users" | "layers" | "credit-card" | "rocket";
  forWhom: string[];
  includes: string[];
  useCases: string[];
  process: { title: string; description: string }[];
  body: string[];
  related: string[];
  cta: string;
};

export const services: ServiceDetail[] = [
  {
    slug: "izrada-web-stranica",
    navTitle: "Izrada web stranica",
    icon: "globe",
    h1: "Izrada web stranica za tvrtke i poduzetnike",
    seoTitle: "Izrada web stranica od 499€ + PDV | PrimeLink Zagreb",
    seoDescription:
      "Izrada modernih, brzih i SEO optimiziranih web stranica za tvrtke u Hrvatskoj. Profesionalan dizajn, jasan proces i fiksna cijena od 499€ + PDV.",
    hero:
      "Izrađujemo profesionalne web stranice koje izgledaju ozbiljno, učitavaju se brzo i pretvaraju posjetitelje u stvarne upite — bez generičkih predložaka.",
    forWhom: [
      "Obrti, mala i srednja poduzeća kojima treba ozbiljan web nastup",
      "Tvrtke koje žele zamijeniti zastarjelu stranicu iz 2015. godine",
      "Poduzetnici koji pokreću novu uslugu i trebaju brzo izaći na tržište",
      "Konzultanti, agencije i specijalisti koji žele jasniju prezentaciju",
    ],
    includes: [
      "Analizu poslovanja, ciljeva i konkurencije",
      "Custom dizajn prilagođen vašem brendu (bez WordPress predložaka)",
      "Razvoj u modernom stacku (React / Vite) ili WordPress prema potrebi",
      "On-page SEO: meta podaci, semantička struktura, brzina, mobilni prikaz",
      "Postavku Google Analytics i Search Console",
      "Hosting, SSL certifikat i osnovnu tehničku podršku",
    ],
    useCases: [
      "Prezentacijska stranica s jasnom porukom i kontaktom",
      "Multi-stranica s opisima usluga i blog modulom",
      "Landing stranica za marketing kampanju",
      "Microsite za novi proizvod ili događaj",
    ],
    process: [
      { title: "Razgovor i ponuda", description: "Kratak poziv u kojem definiramo cilj stranice, opseg i rok. U 48 sata šaljemo fiksnu ponudu." },
      { title: "Dizajn", description: "Izrađujemo dizajn ključnih stranica u Figmi. Iteriramo dok ne pogodimo ton brenda." },
      { title: "Razvoj", description: "Stranicu razvijamo s naglaskom na brzinu, čistoću koda i mobilno iskustvo." },
      { title: "Lansiranje", description: "Postavljamo hosting, SSL, analitiku i indeksiranje. Stranica je spremna za klijente." },
    ],
    body: [
      "Web stranica je danas najjeftiniji i najbrži način da tvrtka izgleda ozbiljno prije nego što netko uopće podigne slušalicu. Ako vam stranica izgleda zastarjelo, sporo se učitava ili ne funkcionira na mobitelu, gubite klijente koje nikad nećete ni upoznati. Kod nas dobijete stranicu koja je projektirana s konkretnim ciljem — dovesti upit, prodati proizvod ili pojasniti uslugu — a ne samo da postoji.",
      "Ne radimo s jeftinim šablonama koje izgledaju isto kao stotinu drugih stranica. Svaki projekt započinje analizom — što prodajete, kome prodajete i što očekujete od stranice. Na temelju toga radimo dizajn koji jasno komunicira vrijednost vaše ponude. Tekstove pomažemo strukturirati tako da posjetitelj u prvih nekoliko sekundi razumije čime se bavite i zašto bi vam vjerovao.",
      "Tehnički, fokusirani smo na ono što stvarno utječe na rezultate: brzinu učitavanja, mobilno iskustvo, čist HTML, semantičke naslove i pravilno postavljene meta podatke. Stranica koja se učitava ispod sekunde rangira bolje i konvertira bolje od stranice koja se učitava četiri. Sve naše stranice prolaze Core Web Vitals provjeru prije isporuke.",
      "Cijena izrade web stranice započinje od 499€ + PDV za jednostavniju prezentacijsku stranicu. Stranica s više modula, vlastitim CMS-om ili posebnim integracijama dobiva ponudu prilagođenu opsegu — nikad ne radimo s 'malim slovima'. Sve što je u ponudi je u cijeni; sve što kasnije zaželite je transparentno doplata.",
      "Nakon lansiranja stranica ne ostaje sama. Nudimo tehničku podršku, sigurnosne nadogradnje i mjesečnu provjeru performansi. Ako vam treba i marketing nakon lansiranja, povezujemo stranicu s Google oglasima i social kampanjama. Ako planirate dodati naprednije funkcionalnosti — rezervacije, korisničke račune, dashboard ili integraciju s drugim sustavima — možemo nadograditi stranicu u pravu web aplikaciju ili CRM, bez ponovne izrade od nule.",
      "Ako vas zanima ozbiljan partner za izradu web stranice, a ne netko tko će vam dostaviti nešto generičko i nestati, javite nam se. U 48 sati ćete dobiti konkretnu ponudu, jasne rokove i točan opis onoga što dobivate.",
    ],
    related: ["redizajn-web-stranica", "web-aplikacije", "saas-razvoj"],
    cta: "Zatražite ponudu za izradu web stranice",
  },
  {
    slug: "redizajn-web-stranica",
    navTitle: "Redizajn web stranica",
    icon: "refresh",
    h1: "Redizajn postojeće web stranice",
    seoTitle: "Redizajn web stranica za tvrtke | PrimeLink",
    seoDescription:
      "Modernizacija postojeće web stranice — bolji dizajn, brže učitavanje, jasnija poruka i veća stopa konverzije. Procjena postojeće stranice je besplatna.",
    hero:
      "Ako stranica izgleda zastarjelo, sporo se učitava ili više ne odgovara onome što danas radite — vrijeme je za redizajn. Radimo modernizaciju bez gubitka SEO pozicija.",
    forWhom: [
      "Tvrtke s WordPress stranicama starijim od 4–5 godina",
      "Poduzeća koja su promijenila ponudu, ali stranica to ne reflektira",
      "Vlasnici stranica s lošim Core Web Vitals rezultatima",
      "Tvrtke koje gube upite jer stranica ne radi dobro na mobitelu",
    ],
    includes: [
      "Audit postojeće stranice (sadržaj, dizajn, performanse, SEO)",
      "Plan migracije koji čuva postojeće SEO pozicije i URL-ove",
      "Novi dizajn s naglaskom na jasnu poruku i konverziju",
      "Tehničku optimizaciju brzine i pristupačnosti",
      "Postavku 301 redirekcija gdje je potrebno",
      "Provjeru indeksiranja i rangiranja nakon lansiranja",
    ],
    useCases: [
      "Prelazak sa zastarjelog WordPress predloška na moderan dizajn",
      "Spajanje više starih stranica u jednu konzistentnu",
      "Modernizacija stranice nakon rebrandinga",
      "Tehnička migracija na brži stack uz zadržavanje sadržaja",
    ],
    process: [
      { title: "Audit", description: "Pregledamo postojeću stranicu — sadržaj, strukturu, performanse i SEO pozicije." },
      { title: "Plan migracije", description: "Definiramo što čuvamo, što mijenjamo i kako migriramo bez gubitka prometa." },
      { title: "Dizajn i razvoj", description: "Radimo novi dizajn i razvijamo stranicu paralelno s postojećom u radu." },
      { title: "Migracija", description: "Postavljamo redirekcije, pratimo Search Console i osiguravamo da pozicije ostanu." },
    ],
    body: [
      "Redizajn web stranice je puno više od 'da to malo izgleda ljepše'. To je prilika da popravite sve što na postojećoj stranici ne funkcionira: nejasnu poruku, lošu strukturu sadržaja, spore performanse, mobilno iskustvo koje frustrira i SEO pozicije koje opadaju. Ako redizajn radite samo zbog dizajna, gubite priliku da popravite pravi problem.",
      "Najveći rizik kod redizajna je gubitak SEO pozicija. Mnoge stranice nakon redizajna izgube polovicu organičkog prometa zato što netko nije razmislio o URL strukturi, redirekcijama i kanonikalnim oznakama. Naš proces uvijek započinje auditom — gledamo koje stranice donose najviše prometa, koji ključni pojmovi vam rangiraju i kako to sve sačuvati u novom okruženju.",
      "Tehnički, redizajn obično znači prelazak na moderni stack koji se brzo učitava i lakše održava. Ako trenutno imate WordPress sa 30 plugina koji se ažuriraju nasumično, možemo migrirati na čišću arhitekturu. Ako vam je važno da i dalje sami uređujete sadržaj, postavljamo lagani CMS koji je jednostavan za korištenje i ne usporava stranicu.",
      "Vizualno, redizajn je prilika da brend dobije ozbiljniju prezentaciju. Tipografija, paleta boja, fotografija i hijerarhija sadržaja — sve to direktno utječe na to koliko ozbiljno potencijalni klijent doživi vašu tvrtku. Naš pristup nije da 'oslikamo' stranicu, nego da postavimo dizajn sustav koji ostaje konzistentan kako stranica raste.",
      "Tijekom redizajna obično dotjeramo i strukturu ponude. Pomažemo prepoznati koje usluge bi trebale dobiti zasebne stranice (kao primjerice naša stranica za izradu CRM sustava ili Stripe integracije), kako bi svaka tema bila jasno odvojena i SEO optimizirana. To dugoročno donosi puno više organičkog prometa od jedne 'sveobuhvatne' stranice.",
      "Pošaljite nam link na vašu postojeću stranicu i u roku od dva radna dana dobit ćete besplatnu procjenu — što funkcionira, što ne i koliko bi koštalo to popraviti.",
    ],
    related: ["izrada-web-stranica", "crm-sustavi", "web-aplikacije"],
    cta: "Pošaljite postojeću web stranicu na procjenu",
  },
  {
    slug: "crm-sustavi",
    navTitle: "Izrada CRM sustava",
    icon: "users",
    h1: "Izrada CRM sustava prilagođenih vašim procesima",
    seoTitle: "Izrada CRM sustava po mjeri | PrimeLink",
    seoDescription:
      "Custom CRM sustavi prilagođeni vašim prodajnim i operativnim procesima. Bez nepotrebnih modula, bez mjesečnih licenci po korisniku.",
    hero:
      "Gradimo CRM sustave koji odgovaraju vašim procesima — a ne obrnuto. Bez plaćanja po korisniku, bez nepotrebnih modula i bez kompromisa kod izvještavanja.",
    forWhom: [
      "Tvrtke koje su prerasle Excel i Google Sheets za vođenje klijenata",
      "Prodajni timovi koje guši složenost generičkih CRM-a poput Salesforcea",
      "Tvrtke koje žele jedan sustav za prodaju, operativu i podršku",
      "Poduzeća koja trebaju vlastite izvještaje koje 'kutijasti' CRM ne podržava",
    ],
    includes: [
      "Mapiranje postojećih procesa (prodaja, podrška, fakturiranje)",
      "Dizajn baze podataka i korisničkih uloga",
      "Sučelje prilagođeno svakodnevnoj uporabi",
      "Automatizacije: e-mail obavijesti, statusi, podsjetnici",
      "Izvještaje i dashboard prilagođen menadžmentu",
      "Integracije s e-mailom, kalendarom, fakturiranjem i Stripeom",
    ],
    useCases: [
      "CRM za prodajni tim s pipeline pregledom i power dialingom",
      "Sustav za vođenje projekata i klijenata u agenciji",
      "Operativni sustav za servis ili instalacije s rasporedom terena",
      "Sustav za vođenje članova udruge ili korisnika programa",
    ],
    process: [
      { title: "Analiza procesa", description: "Mapiramo kako trenutno radite, gdje gubite vrijeme i koje podatke ne vidite." },
      { title: "Specifikacija i prototip", description: "Radimo klikabilni prototip ključnih ekrana prije pisanja koda." },
      { title: "Razvoj iterativno", description: "Razvijamo modul po modul. Vi koristite sustav od prvog mjeseca." },
      { title: "Migracija i obuka", description: "Prebacujemo postojeće podatke i obučavamo tim za korištenje." },
    ],
    body: [
      "Većina tvrtki dolazi nam nakon što su isprobale tri generička CRM-a i naplatile nekoliko stotina eura mjesečno za alate koje koristi 30% tima. Problem je uvijek isti — generički CRM zahtijeva da vi prilagodite svoj proces njihovoj logici. Naš pristup je obrnut: prvo razumijemo kako vi radite, a zatim gradimo sustav koji to podržava bez kompromisa.",
      "Custom CRM nije skuplji od godišnje pretplate na enterprise alat. Razlika je u tome što umjesto da plaćate vječno po korisniku, jednom uložite u sustav koji je vaš. Možete dodati 50 novih korisnika bez da vam mjesečni trošak skoči. Možete promijeniti procese bez čekanja na update vendora. Možete vlasništvo i podatke držati kod sebe.",
      "Tehnički, gradimo CRM-ove na modernom web stacku — React/Next na frontu, Postgres ili Supabase na backu, deploy u cloud koji vi kontrolirate. Sustav je dostupan iz preglednika, radi i na mobitelu, i može se proširivati API-jem. Sve što vidite na sučelju u pozadini je čist API koji možete koristiti i za druge integracije.",
      "Automatizacije su tu gdje custom CRM stvarno štedi vrijeme. Automatski e-mail kada lead pređe u određeni status. Podsjetnik prodavaču ako klijent nije kontaktiran 7 dana. Generiranje ponude iz template-a jednim klikom. Sinkronizacija s Google Kalendarom, e-mailom i fakturiranjem. Sve što tjedno radite ručno — automatiziramo.",
      "Izvještavanje je obično razlog zašto tvrtke prerastu generičke CRM-e. Vlasnik želi vidjeti konkretne brojeve — koliko leadova po izvoru, prosječno vrijeme zatvaranja, prihod po prodavaču, conversion rate po fazi. Kod custom CRM-a izvještaje gradimo točno kako vi trebate, bez ograničenja 'modula za izvještavanje' koji košta dodatno.",
      "Ako razmišljate o vlastitom CRM-u, javite nam se s opisom procesa. Često je dovoljan jedan poziv od 30 minuta da se vidi je li custom rješenje smislenije od pretplate. Cijena ovisi o opsegu, ali većina prvih verzija polazi od reda veličine dvije godine pretplate na enterprise alat — nakon toga štedite svake godine.",
    ],
    related: ["web-aplikacije", "saas-razvoj", "stripe-integracije"],
    cta: "Zatražite analizu CRM projekta",
  },
  {
    slug: "web-aplikacije",
    navTitle: "Izrada web aplikacija",
    icon: "layers",
    h1: "Izrada web aplikacija po mjeri",
    seoTitle: "Izrada web aplikacija za tvrtke | PrimeLink",
    seoDescription:
      "Custom web aplikacije i interni alati za tvrtke — od planiranja do produkcije. Skalabilna rješenja koja zamjenjuju Excel, papir i nepovezane sustave.",
    hero:
      "Gradimo web aplikacije koje rješavaju konkretne poslovne probleme — interne alate, portale, dashboard sustave i korisnička sučelja koja zamjenjuju ručni rad.",
    forWhom: [
      "Tvrtke koje koriste Excel za procese koji su prerasli Excel",
      "Operativni timovi koji rade u 5 različitih alata istovremeno",
      "Poduzeća koja žele dati klijentima vlastiti portal",
      "Tvrtke koje imaju jasan poslovni proces, ali nemaju softver koji ga podržava",
    ],
    includes: [
      "Specifikaciju i wireframeove ključnih ekrana",
      "Korisničke uloge i sustav prava pristupa",
      "Bazu podataka, API i autentikaciju",
      "Sučelje optimizirano za desktop i mobitel",
      "Integracije s vanjskim sustavima (ERP, e-mail, plaćanja)",
      "Hosting, monitoring i podršku nakon lansiranja",
    ],
    useCases: [
      "Klijentski portal s pregledom narudžbi i dokumenata",
      "Interni alat za upravljanje skladištem ili logistikom",
      "Booking sustav s kalendarom i automatskim plaćanjem",
      "Dashboard za vođenje operativnih KPI-jeva",
    ],
    process: [
      { title: "Discovery", description: "Razgovaramo s krajnjim korisnicima i mapiramo postojeće alate." },
      { title: "Prototip", description: "Klikabilni Figma prototip kako bi se ključni tokovi vidjeli prije razvoja." },
      { title: "Razvoj", description: "Modularan razvoj u sprintovima — funkcionalnost po funkcionalnost." },
      { title: "Produkcija", description: "Postavljanje na cloud, monitoring, edukacija korisnika i podrška." },
    ],
    body: [
      "Web aplikacije nisu samo 'veće web stranice' — to su poslovni alati koji moraju pouzdano raditi svaki dan i podnositi rast tima i podataka. Naš fokus kod razvoja web aplikacija je da prvo dobro razumijemo proces, a zatim ga pretvorimo u sučelje koje korisnici stvarno žele koristiti. Ako alat nije ugodan za korištenje, tim će se vratiti na Excel.",
      "Tipičan trenutak za izradu vlastite web aplikacije je kada tvrtka zatekne da koristi 4–5 različitih alata koji ne pričaju međusobno — Excel za jedno, Google Forms za drugo, e-mail za treće, papir za četvrto. Custom web aplikacija centralizira proces, smanjuje pogreške, ubrzava operativu i daje menadžmentu jednu istinu o stanju stvari.",
      "Tehnički gradimo aplikacije u modernom stacku — TypeScript, React/Next.js, Postgres, Supabase ili Node backend ovisno o potrebama. Pažljivo biramo tehnologiju za svaki projekt: nećemo vam preporučiti mikroservisnu arhitekturu ako vam treba alat za 20 korisnika, ali nećemo ni napraviti monolit koji se ne može skalirati ako planirate rasti.",
      "Sigurnost je dio osnovne isporuke. Sve aplikacije imaju autentikaciju, kontrolu pristupa po ulogama, enkripciju podataka u tranzitu i pažljivo dizajnirane RLS politike na bazi. Ako radite s osjetljivim podacima — zdravstvenim, financijskim ili osobnim — to oblikuje arhitekturu od prvog dana, a ne na kraju.",
      "Web aplikacije koje gradimo lako se proširuju u prave SaaS proizvode ako u nekom trenutku odlučite ponuditi rješenje i drugim tvrtkama. Mnogi naši klijenti su upravo tako prešli iz 'mi smo to napravili za sebe' u 'sada to prodajemo i drugima'. Pogledajte i naše stranice o izradi CRM sustava i SaaS razvoju za susjedne usluge.",
      "Ako imate proces koji vam guta vrijeme i razmišljate o vlastitom alatu, javite nam se. Pomoći ćemo procijeniti opseg, predložiti najjeftiniji put do MVP-a i napraviti plan koji ne troši budžet na funkcionalnosti koje nikome ne trebaju.",
    ],
    related: ["crm-sustavi", "saas-razvoj", "stripe-integracije"],
    cta: "Razgovarajmo o vašoj web aplikaciji",
  },
  {
    slug: "stripe-integracije",
    navTitle: "Stripe integracije",
    icon: "credit-card",
    h1: "Stripe integracije za web stranice i aplikacije",
    seoTitle: "Stripe integracije za tvrtke u Hrvatskoj | PrimeLink",
    seoDescription:
      "Implementacija Stripe plaćanja, pretplata i Connect platformi u web stranice, aplikacije i SaaS proizvode — sigurno i prema PCI standardima.",
    hero:
      "Implementiramo Stripe za web stranice, web shopove i SaaS proizvode — od jednokratnih plaćanja do pretplata, kupona, refundacija i Stripe Connect platformi.",
    forWhom: [
      "Web shopovi koji žele jednostavnije i sigurnije plaćanje",
      "SaaS proizvodi s mjesečnim i godišnjim pretplatama",
      "Marketplaces koji isplaćuju partnerima preko Stripe Connecta",
      "Tvrtke koje žele plaćanje karticama bez kompleksne PCI usklađenosti",
    ],
    includes: [
      "Postavku Stripe računa i webhookova",
      "Checkout sučelje s podrškom za karticu, Apple Pay i Google Pay",
      "Pretplate, trial periode, kupone i popuste",
      "Automatsko izdavanje računa i e-mail obavijesti",
      "Sinkronizaciju s CRM-om ili internim sustavom",
      "Test okruženje i dokumentaciju za vaš tim",
    ],
    useCases: [
      "Naplata jednokratne usluge na web stranici",
      "Pretplatnički model za SaaS proizvod",
      "Stripe Connect za marketplace s više prodavača",
      "Naplata polica, depozita i rate plaćanja",
    ],
    process: [
      { title: "Analiza modela naplate", description: "Definiramo kako želite naplatiti — jednokratno, pretplata, kombinacija." },
      { title: "Implementacija", description: "Integriramo Stripe API i postavljamo webhookove za sve relevantne događaje." },
      { title: "Testiranje", description: "Prolazimo kroz sve scenarije: uspjeh, neuspjeh, refund, dispute, otkaz pretplate." },
      { title: "Produkcija", description: "Prelazak na live ključeve, monitoring transakcija i obuka tima." },
    ],
    body: [
      "Stripe je danas standard za online naplatu u modernim web aplikacijama — i s razlogom. Brza implementacija, jasna dokumentacija, podrška za sve relevantne metode plaćanja i niža naknada od većine domaćih rješenja. Ali pravilna implementacija je više od 'kopiraj kod iz dokumentacije': zahtijeva pažljivo postavljanje webhookova, sigurno baratanje tajnim ključevima i pažljiv UX checkout iskustva.",
      "Najčešći zahtjev koji dobivamo su pretplatnički modeli. Tvrtke koje pokreću SaaS proizvod žele jasno postavljene planove, mogućnost trial perioda, popuste putem kupona i automatske refundacije. Sve to Stripe podržava odlično, ali zahtijeva nekoliko ključnih odluka u arhitekturi koje je puno teže ispraviti kasnije nego postaviti odmah.",
      "Drugi tip projekta su Stripe Connect platforme — marketplaces, agregatori usluga ili sustavi koji prikupljaju novac od kupaca i isplaćuju ga partnerima. To je kompleksniji scenarij koji zahtijeva poznavanje 'Express' i 'Custom' Connect računa, KYC procesa i pravilnog usmjeravanja sredstava. Imamo iskustvo s takvim platformama i znamo zaobići uobičajene zamke.",
      "Sigurnost je kritična kod plaćanja. Sve naše integracije koriste Stripe Elements ili Checkout — što znači da podaci o kartici nikada ne prolaze kroz vaš server. To dramatično pojednostavljuje PCI usklađenost. Webhookovi su verificirani potpisom, tajni ključevi su u secret manageru, a sve transakcije su logirane radi audita.",
      "Stripe integracija najčešće je dio veće web aplikacije ili CRM sustava (povezane stranice). Ako vam treba samo plaćanje na postojećoj web stranici, to je posao od nekoliko dana. Ako vam treba kompletna pretplatnička logika s portalom za korisnike, to je posao od nekoliko tjedana — ali rezultat je sustav koji možete skalirati bez razmišljanja o naplati godinama unaprijed.",
      "Pošaljite nam opis modela naplate ili vašu trenutnu Stripe konfiguraciju i u dva dana ćete dobiti procjenu opsega i fiksnu cijenu implementacije.",
    ],
    related: ["saas-razvoj", "web-aplikacije", "crm-sustavi"],
    cta: "Zatražite ponudu za Stripe integraciju",
  },
  {
    slug: "saas-razvoj",
    navTitle: "SaaS razvoj",
    icon: "rocket",
    h1: "Razvoj SaaS proizvoda — od ideje do produkcije",
    seoTitle: "SaaS razvoj i izrada SaaS proizvoda | PrimeLink",
    seoDescription:
      "Pomažemo tvrtkama i osnivačima razviti SaaS proizvod — od validacije ideje i MVP-a, do skalabilne arhitekture, pretplata i produkcijskog hostinga.",
    hero:
      "Pomažemo osnivačima i tvrtkama lansirati SaaS proizvod — od specifikacije i MVP-a do skalabilne arhitekture, pretplatničkog modela i produkcijskog hostinga.",
    forWhom: [
      "Osnivači koji imaju validiranu ideju i traže tehničkog partnera",
      "Tvrtke koje žele od internog alata napraviti komercijalni proizvod",
      "Konzultanti koji žele svoje znanje pretvoriti u skalabilni softver",
      "Postojeći SaaS proizvodi kojima treba rebuild ili nadogradnja",
    ],
    includes: [
      "Product discovery: definiciju cilja, korisnika i ključnih značajki",
      "Tehničku arhitekturu spremnu za rast (multi-tenant, role, plaćanja)",
      "MVP koji je u rukama prvih korisnika u realnom roku",
      "Pretplatnički model uz Stripe (planovi, kuponi, trialovi)",
      "Onboarding, e-mail flow i analitiku ponašanja",
      "Hosting, monitoring i CI/CD pipeline",
    ],
    useCases: [
      "B2B SaaS za nišnu industriju",
      "Tooling za agencije ili interne timove",
      "API-driven SaaS proizvodi s developerima kao korisnicima",
      "Vertikalne SaaS aplikacije (HR, edukacija, zdravstvo, logistika)",
    ],
    process: [
      { title: "Discovery i strategija", description: "Definiramo ciljnu publiku, ključni problem i minimalni set funkcionalnosti." },
      { title: "MVP razvoj", description: "Gradimo MVP koji rješava jasan problem i može biti u rukama korisnika u tjednima." },
      { title: "Iteracija", description: "Slušamo prve korisnike, mjerimo ponašanje i optimiziramo proizvod." },
      { title: "Skaliranje", description: "Refaktoriramo dijelove koji to traže, postavljamo infrastrukturu za rast." },
    ],
    body: [
      "SaaS proizvod je drugačiji od web stranice ili interne aplikacije. Mora podržavati više klijenata istovremeno (multi-tenant), imati pouzdanu naplatu, podržati onboarding novih korisnika bez vaše intervencije i biti u stanju rasti bez da svaki novi korisnik zahtijeva ručni rad. To su odluke koje se donose u prvim tjednima i koje dramatično utječu na to koliko će proizvod biti održiv kasnije.",
      "Naš pristup SaaS razvoju je pragmatičan. Ne gradimo 'platformu spremnu za milijun korisnika' za proizvod koji još nema prvog plaćenog klijenta. Gradimo MVP koji rješava jasan problem za jasno definiranu publiku, postavlja temelje koji se mogu skalirati, i ostavlja prostora za promjenu smjera kada feedback to traži. Većina prvih verzija je u produkciji u 8–12 tjedana.",
      "Tehnički, koristimo provjerene komponente: TypeScript i React/Next na frontu, Postgres s pravilnom multi-tenant izolacijom, Stripe za pretplate, modernu autentikaciju s OAuth opcijama. Sve te stvari su 'riješeni problemi' koji ne moraju trošiti vrijeme i budžet — koristimo provjerene biblioteke umjesto da ih ponovno izmišljamo.",
      "Onboarding je dio proizvoda koji često određuje hoće li SaaS imati uspjeha. Ako se korisnik zbuni u prvih 5 minuta, neće se vratiti. Gradimo onboarding flowove koji vode korisnika do 'aha' trenutka što je brže moguće, mjerimo gdje korisnici odustaju i optimiziramo. To je posao koji se ne završava — i nakon lansiranja stalno se vraćamo na njega.",
      "Plaćanja gotovo uvijek znače Stripe (pogledajte i našu zasebnu stranicu o Stripe integracijama). Postavljamo planove, kupone, godišnje popuste, trial periode i customer portal kako bi se korisnici sami mogli baviti svojim pretplatama. Manje support tiketa, više vremena za razvoj.",
      "Ako imate ideju ili proizvod koji želite pokrenuti ili dignuti na sljedeću razinu, javite nam se. Ne tražimo svaki posao — radimo s osnivačima i timovima koji imaju jasnu sliku komu prodaju i zašto. Razgovor je besplatan i obično vrlo konkretan.",
    ],
    related: ["web-aplikacije", "crm-sustavi", "stripe-integracije"],
    cta: "Dogovorite kratki poziv o vašem SaaS proizvodu",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
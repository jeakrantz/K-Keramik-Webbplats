# Fullstacksutveckling med ramverk - Projektuppgift
## Klientapplikation
### Utvecklare: Jeanette Krantz

Detta projekt är del av projektuppgiften i kursen Fullstacksutveckling med ramverk (DT193G), på Mittuniversitetet i Sundsvall. 
Applikationen ska fungera som en intranät-applikation för företaget KåKeramik. Där kan de hantera sitt lager. Applikationen använder CSS-ramverket Bootstrap via npm för styling. 

### Funktionalitet
Funktionalitet som finns i applikationen är:

- Lägga till och ta bort produkter, kategorier och dokument.
- Ändra data som lagras om produkter.
- Söka efter enskilda produkter. 

Det finns även funktionalitet för att logga in och registera användare. Alla applikationens funktioner kräver autenrisering för att komma åt. 

### Singel-Page Applikation
Klientapplikationen är uppbyggd med SPA och har olika routes för att visa rätt vy. De routes som finns är: 

- {path: '/', name: 'home', component: HomeView, (kontroll inloggning)}
- {path: '/om-webbplatsen', name: 'om webbplatsen', component: AboutView, (kontroll inloggning)}
- {path: '/kategorier', name: 'kategorier', component: CategoriesView, (kontroll inloggning)}
- {path: '/enskild-kategori/:id', name: 'enskild kategori', component: SingleCategoryView, (kontroll inloggning)}
- {path: '/dokument', name: 'dokument', component: DocumentView, (kontroll inloggning)}
- {path: '/logga-in', name: 'logga in', component: LoginView}
- {path: '/produkter', name: 'produkter', component: ProductsView, (kontroll inloggad)}
- {path: '/enskild-produkt/:id', name: '/enskild produkt', component: SingleProductView, (kontroll inloggad)}
- {path: '/add-product', name: 'add-product', component: AddProductView, (kontroll inloggad)}
- {path: '/search', name: 'search', component: SearchView, (kontroll inloggad)}

  

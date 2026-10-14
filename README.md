# Portfolio

Een simpele portfolio-site zonder framework: gewoon HTML, CSS en een beetje JavaScript.

## Wat staat waar

- `script.js`: bovenaan vul je je naam, e-mail, LinkedIn, GitHub en je lijst met projecten in. Het menu, de projectenlijst en de footer worden hieruit gemaakt, dus je past dit maar op één plek aan.
- `index.html`: de homepage met "Over mij" en "Talen en frameworks".
- `project-1.html`, `project-2.html`, `project-3.html`: een pagina per project.
- `style.css`: kleuren en lettertypen staan bovenaan in `:root`.
- `images/`: zet hier je foto's.

## Alles invullen

Zoek in alle bestanden op `[` om elke plek te vinden die nog ingevuld moet worden.

## Afbeeldingen

Geef je foto's deze namen (of pas de namen aan in de HTML en in `script.js`):

- `images/profielfoto.jpg`
- `images/project-1-cover.jpg`, `images/project-1-1.jpg`, `images/project-1-2.jpg`, `images/project-1-3.jpg`
- hetzelfde voor project 2 en 3

Ontbreekt een foto, dan zie je een grijsblauwe placeholder. Maak foto's kleiner dan ongeveer 300 KB (bijvoorbeeld op squoosh.app), anders laadt de site traag.

## Project toevoegen

1. Kopieer `project-3.html` en noem de kopie `project-4.html`.
2. Zet in die pagina `data-page="project-4.html"` in de `<body>`-regel.
3. Voeg in `script.js` een blok toe aan `PROJECTS`.

## Cv

Zet je cv als `cv.pdf` in dezelfde map als `index.html`.

## Online zetten met GitHub Pages

1. Maak een repository met de naam `jouwgebruikersnaam.github.io` op je persoonlijke account (niet in een organisatie).
2. Upload alle bestanden en de map `images`, zodat `index.html` in de hoofdmap staat.
3. Ga naar Settings, dan Pages. Kies "Deploy from a branch", branch `main`, map `/ (root)` en klik op Save.
4. Na een paar minuten staat de site op `https://jouwgebruikersnaam.github.io`.

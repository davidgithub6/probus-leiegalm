#!/usr/bin/env node
/**
 * seed-huisreglement.mjs
 * Creates/updates the 'huisreglement' pagina in Payload CMS.
 *
 * Usage:
 *   SEED_BASE=https://probus-cms.david-develops.workers.dev \
 *   SEED_EMAIL=admin@... \
 *   SEED_PASSWORD=... \
 *   node seed-huisreglement.mjs
 */

const BASE = process.env.SEED_BASE || 'https://probus-cms.david-develops.workers.dev';
const EMAIL = process.env.SEED_EMAIL;
const PASSWORD = process.env.SEED_PASSWORD;

if (!EMAIL || !PASSWORD) {
    console.error('Stel SEED_EMAIL en SEED_PASSWORD in als omgevingsvariabelen.');
    process.exit(1);
}

// ─── Lexical node helpers ────────────────────────────────────────────────────

const txt = (t, format = 0) => ({ type: 'text', text: t, format, version: 1 });

const p = (t) => ({
    type: 'paragraph', version: 1,
    children: [txt(t)],
});

const h = (tag, t) => ({
    type: 'heading', tag, version: 1,
    children: [txt(t)],
});

const ul = (...items) => ({
    type: 'list', listType: 'bullet', version: 1,
    children: items.map(i => ({
        type: 'listitem', version: 1, value: 1,
        children: [txt(i)],
    })),
});

const ol = (...items) => ({
    type: 'list', listType: 'number', version: 1,
    children: items.map((i, idx) => ({
        type: 'listitem', version: 1, value: idx + 1,
        children: [txt(i)],
    })),
});

const hr = () => ({ type: 'horizontalrule', version: 1 });

// ─── Huisreglement content ───────────────────────────────────────────────────

const inhoud = {
    root: {
        type: 'root', version: 1,
        children: [

            h('h2', 'Artikel 1'),
            p('Alle leden van Probus "Leiegalm" Menen–Wevelgem onderschrijven het kaderreglement van het Coördinatie- en Informatiecentrum van Probus in België (C.I.C. Probus Belgium).'),

            h('h2', 'Artikel 2'),
            h('h3', 'a) Bestuursorganigram'),
            p('Het dagelijks bestuur bestaat uit:'),
            ul(
                'de voorzitter',
                'de past-voorzitter',
                'de ondervoorzitter-protocolchef',
                'de secretaris',
                'de penningmeester',
                'de ICT-verantwoordelijke',
            ),
            p('Een Probuswerkjaar loopt van 1 januari tot 31 december.'),
            p('Het dagelijks bestuur is alleen bevoegd voor die zaken die betrekking hebben op het lopende werkjaar.'),
            p('Het dagelijks bestuur kan zich tijdelijk laten bijstaan door andere leden (bijv. bij organisaties van uitstappen, enz.)'),
            p('De voorzitter roept het dagelijks bestuur bijeen volgens de noodwendigheden of op vraag van minstens 3 andere leden van het dagelijks bestuur.'),
            p('De ondervoorzitter wordt het daaropvolgende Probusjaar automatisch voorzitter.'),
            p('Na 2 jaar kan een past-voorzitter terug verkiesbaar worden als ondervoorzitter doch enkel met zijn voorafgaande toestemming.'),
            p('De past-voorzitter zorgt dat \'Het Gulden Boek\' bijgewerkt wordt. In dit boek noteert hij het beknopt verslag van zijn voorbije werkjaar.'),
            p('De taak van penningmeester, secretaris, ICT-verantwoordelijke wordt op vrijwillige basis aangenomen en is niet tijdsgebonden.'),
            p('De penningmeester en een tweede persoon in functie moeten naamtekening hebben bij een financiële instelling op naam van Probus-Leiegalm.'),
            p('Elke betaling door de leden aan de club en door de penningmeester zal geschieden door overschrijving.'),
            p('Een betaling door de penningmeester is enkel mogelijk na voorlegging van een schuldvordering of factuur.'),

            h('h3', 'b) Raad van wijzen'),
            p('De raad van wijzen bestaat uit het dagelijks bestuur en aangevuld met de laatste twee gewezen voorzitters, die niet zetelen in het dagelijks bestuur.'),
            p('Deze raad wordt voorgezeten door de voorzitter.'),
            p('De raad der wijzen wordt uitzonderlijk samengeroepen als de problemen in de club het dagelijks bestuur overstijgen.'),
            p('Deze vergadering kan ofwel door de voorzitter of op vraag van minimaal 3 gewezen voorzitters samengeroepen worden.'),

            h('h3', 'c) Algemene vergadering'),
            p('De algemene vergadering bestaat uit alle leden van Probus-Leiegalm.'),
            p('De algemene vergadering komt samen op de eerste donderdag van december, op een locatie door de uittredende voorzitter te bepalen.'),
            p('De algemene vergadering kan zo nodig met eenvoudige meerderheid der uitgebrachte stemmen wijzigingen aanbrengen aan het huisreglement.'),
            p('Alle rekeningen van het afgelopen jaar worden door de penningmeester aan de algemene vergadering kort toegelicht en ter goedkeuring voorgelegd.'),
            p('Op de algemene vergadering wordt een ondervoorzitter gekozen. De ondervoorzitter moet minstens door de helft +1 van de uitgebrachte stemmen verkozen worden.'),
            p('De ondervoorzitter wordt gekozen uit de groep van leden die te kennen gegeven hebben dat ze kandidaat zijn. In die groep kunnen ook oud-voorzitters, die voldoen aan de gestelde voorwaarden, zitten. Als er geen kandidaten zijn wordt de ondervoorzitter gekozen uit de lijst van alle leden die nog nooit voorzitter geweest zijn en minstens één jaar lid zijn van de club.'),
            p('Principieel kan een verkozen ondervoorzitter het voorzitterschap niet weigeren tenzij in geval van ernstige reden. Het is het dagelijks bestuur dat daarover oordeelt.'),
            p('In dat geval kan rechtstreeks, in de algemene vergadering, een andere voorzitter gekozen worden uit de lijst van de oud-voorzitters, regerende voorzitter inbegrepen. De aldus verkozen voorzitter moet minstens door de helft + 1 van de uitgebrachte stemmen verkozen worden.'),
            p('Elk lid dat niet aanwezig is op de verkiezingsdag kan zich laten vertegenwoordigen door een ander aanwezig lid, door middel van een schriftelijke volmacht. Elk lid mag slechts drager zijn van één volmacht.'),
            p('Na de verkiezingen in december zal de naam van de nieuwe voorzitter door de secretaris medegedeeld worden aan het C.I.C.'),

            h('h2', 'Artikel 3'),
            h('h3', 'Leden, ereleden, weduwen en kandidaat-leden'),

            h('h3', 'a) Leden'),
            p('Probus-Leiegalm is, sedert de oprichting en tot op heden, een club bestaande uit louter mannelijke leden.'),
            p('Wenselijk is dat het aantal leden wordt beperkt tot maximum 45, zonder de ereleden.'),
            p('Van de leden wordt verwacht dat ze zoveel mogelijk de maandelijkse vergaderingen bijwonen. De secretaris houdt een afwezigheidslijst bij.'),
            p('De voertaal in de club is het Nederlands.'),
            p('Ieder lid van de club met minimaal 1 jaar anciënniteit komt in aanmerking voor het ondervoorzitterschap en automatisch het jaar daarop voor het voorzitterschap.'),
            p('Het is wenselijk dat het grootste deel van de leden afkomstig is van Menen en Wevelgem, doch dat dit niet belet dat personen uit een bredere omgeving niet welkom zijn.'),

            h('h3', 'b) Ereleden'),
            p('Een lid dat in de onmogelijkheid is om verder regelmatig deel te nemen aan de maandelijkse Probusbijeenkomsten, kan worden opgenomen als ere-Probuslid. Dit gebeurt in overleg met de voorzitter. De voorzitter meldt dit in de eerstvolgende vergadering.'),
            ul(
                'Ereleden blijven verbonden met Probus-Leiegalm.',
                'Als ze het verkiezen ontvangen ze nog het maandelijks verslag.',
                'Als het past om een vergadering of een andere activiteit bij te wonen dan zijn ze altijd welkom, maar dan moeten ze dat tijdig en op de afgesproken manier melden (zie artikel 4: organisatie).',
                'Ereleden moeten geen jaarlijks lidgeld betalen.',
                'Ereleden hebben geen stemrecht om een nieuwe (onder)voorzitter te kiezen.',
            ),

            h('h3', 'c) Weduwen'),
            p('De weduwen van onze betreurde leden worden niet vergeten.'),
            ul(
                'Als ze het wensen dan ontvangen ze nog het maandelijks verslag.',
                'Ze worden uitgenodigd voor de novembervergadering (herdenking overleden leden) en de nieuwjaarsvergadering van januari.',
                'Ze worden ook gevraagd voor andere bijkomende activiteiten (o.a. uitstappen).',
            ),

            h('h3', 'd) Kandidaat-leden'),
            p('Bij het zoeken naar kandidaat-leden is het belangrijk dat het personen zijn die voldoen aan het kaderreglement van het C.I.C. en passen binnen het specifieke profiel van Probus-Leiegalm.'),
            p('De club staat open voor personen tussen 55 en 70 jaar. Hieronder wordt verstaan dat de leeftijd van 71 jaar niet mag bereikt zijn op het moment van de kandidaatstelling.'),
            p('Procedure bij het aanwerven van een nieuw lid:'),
            ol(
                'Een kandidaat-lid moet eerst voorgesteld worden door één peter, lid van de club, aan het dagelijks bestuur.',
                'Indien er aanmerkingen of bezwaren worden gemaakt bij de voorzitter, dan oordeelt het dagelijks bestuur over deze aanmerkingen/bezwaren. Indien het dagelijks bestuur tot het besluit komt dat de aanmerkingen voldoende ernstig/zwaarwegend zijn, kan het kandidaat-lid niet aangenomen worden.',
                'Het nieuw lid kan aangenomen worden na de periode van de mogelijke inspraak, hetzij na het besluit van het dagelijks bestuur dat de geformuleerde aanmerkingen onvoldoende ernstig zijn. Het toekomstig lid kan door de peter, op vraag van de voorzitter, uitgenodigd worden tot het bijwonen van twee Probus-bijeenkomsten als kandidaat-lid. Dit kan ten vroegste twee maanden na de melding van de voorzitter in de maandelijkse vergadering. De peter moet er voor zorgen dat het kandidaat-lid op de hoogte is van het kaderreglement van Probus België en het huisreglement van de club. De kandidaat-leden moeten er attent op gemaakt worden door hun peter dat zij, eens lid van de club, kunnen gevraagd worden om een bestuursfunctie op te nemen.',
                'Voor het kandidaat-lid volgt daarna de "installatie". Op deze installatie leest de peter het beperkte curriculum vitae van het nieuwe lid voor. Aan ieder nieuw lid wordt bij de installatie, naast het Probusspeldje, ook de Probusoorkonde, een exemplaar van het huisreglement en de adressenlijst van alle leden uitgereikt. Hij ontvangt ook het formulier "Toestemming met betrekking tot het gebruik van persoonlijke gegevens". Dit formulier moet, ondertekend door het nieuwe lid en zijn eventuele partner, zo vlug mogelijk aan de secretaris bezorgd worden. Van het nieuwe lid wordt ook een kort woord verwacht. De peter zorgt ervoor dat het nieuwe lid daarvan op de hoogte is.',
                'Pas na de opname in de club zal het nieuwe lid op verzoek van de penningmeester zijn (half)jaarlijkse bijdrage betalen.',
            ),

            h('h2', 'Artikel 4'),
            h('h3', 'Organisatie'),
            p('De gewone ontmoetingen van Probus-Leiegalm worden, zonder tegenbericht, gehouden op de eerste donderdag van de maand; het aanvangsuur, dat maandelijks kan wisselen, wordt tijdig door de secretaris aan de leden gemeld.'),
            p('In de maand augustus is er geen bijeenkomst.'),
            p('De huidige locatie: restaurant Vijverhof Wevelgem.'),
            p('Elk lid dat wenst een causerie te houden, moet dit tijdig met de voorzitter bespreken zodat dit kan gepland worden in het kader van het jaarprogramma.'),
            p('Naast de gewone vergaderingen zijn er in de loop van het jaar ook speciale bijeenkomsten met een gastspreker. Bovendien zijn er jaarlijks enkele uitstappen en/of bedrijfsbezoeken.'),
            p('In overleg met de familie zal er regelmatig contact gehouden worden met langdurig zieke leden en ereleden.'),
            p('Overleden leden en ereleden worden op een passende wijze herdacht in november.'),
            p('De groepsverzekering van Probus-Leiegalm is geldig voor de leden en voor de genodigden.'),
            p('Soberheid is de stelregel, dus is er geen traktaat bij verjaardagen. Bij politieke discussies en onmin dient de voorzitter met tact tussen te komen.'),
            p('Iedere maand andere tafelgenoten opzoeken wordt warm aanbevolen.'),
            p('Het verslag van de maandelijkse vergaderingen wordt, door de secretaris, aan ieder lid bezorgd. De ere-Probusleden en de weduwen van overleden leden, die het wensen, kunnen eveneens een verslag ontvangen.'),
            p('Bij het niet-deelnemen aan een gewone maandelijkse vergadering worden de leden van Probus-Leiegalm uitdrukkelijk verzocht hun afwezigheid de maandagavond vóór de vergadering, uiterlijk vóór 19.00 uur, per mail aan de secretaris en de voorzitter te melden. De secretaris zal die mail beantwoorden met "genoteerd". Die maandag wordt de bedoelde lijst dan ook om 19.00 uur afgesloten.'),
            p('Ook ereleden die een vergadering wensen bij te wonen moeten hun aanwezigheid op dezelfde manier kenbaar maken. De secretaris zal hun aanvraag ook beantwoorden.'),
            p('Elk lid dat zich niet heeft afgemeld voor de gewone maandelijkse vergadering zal de kostprijs van de maaltijd, zonder dranken, op eenvoudig verzoek van de secretaris, moeten storten op de Probusrekening in de week volgend op de vergadering. Het hierboven vermelde bedrag wordt door de penningmeester op de dag van de vergadering aan het restaurant betaald.'),
            p('Bij elke vergadering in het restaurant zorgt de secretaris ervoor dat het aantal deelnemers tijdig, zoals afgesproken met het restaurant, gemeld wordt.'),
            p('De kosten van de maandelijkse maaltijd worden door de leden ter plaatse rechtstreeks met het restaurant geregeld.'),
            p('Voor sommige vergaderingen, uitstappen en bedrijfsbezoeken geldt de overschrijving van het verschuldigde bedrag op de bankrekening van Probus-Leiegalm als bewijs van deelname. Die overschrijving moet uiterlijk om 19.00 uur van de afgesproken stortingsdatum op de rekening van Probus-Leiegalm staan.'),

            h('h2', 'Artikel 5'),
            h('h3', 'De jaarlijkse bijdrage'),
            p('De jaarlijkse bijdrage wordt zeer democratisch gehouden. Dit bedrag moet voldoende zijn om de jaarlijkse kosten te kunnen dekken. Het bedrag wordt ieder jaar bepaald door het dagelijks bestuur en aan de leden gemeld en het moet worden gestort op de Probusrekening in de eerste week van het nieuwe werkjaar.'),
            p('Het lid dat na een tweede schriftelijke aanmaning (mail) tot betaling zijn bijdrage nog steeds niet heeft betaald, is ontslagnemend.'),
            p('De ereleden en de weduwen van overleden leden zijn vrijgesteld van de jaarlijkse bijdrage.'),

            h('h2', 'Artikel 6'),
            h('h3', 'Privacyverklaring'),
            p('De persoonsgegevens die u ons bezorgd hebt worden verwerkt door de ICT-verantwoordelijke van Probus-Leiegalm. Deze gegevens worden enkel gebruikt voor ledenbeheer en om u op de hoogte te houden van onze activiteiten op basis van ons gerechtvaardigd belang om samen de doelstellingen van Probus World waar te maken.'),
            p('Wij verwijzen ook naar de algemene privacyverklaring van onze koepelvereniging Probus Belgium.'),
            p('Indien u niet wil dat wij uw gegevens verwerken met het oog op direct marketing, volstaat het ons dat mee te delen op het mailadres van de ICT-verantwoordelijke.'),
            p('Via dat adres kan u ook altijd vragen welke gegevens wij over u verwerken en ze verbeteren of laten wissen.'),
            p('Versie opgemaakt op 25 november 2024'),

            hr(),

            h('h2', 'C.I.C. Probus Belgium — Kaderreglement'),
            ol(
                'Probus heeft als eerste doelstelling de bevordering van de vriendschap en de wederzijdse verdraagzaamheid tussen de leden.',
                'Politieke, religieuze of ideologische standpunten kunnen niet de leidraad of de beweegreden zijn bij de oprichting van een Probusclub.',
                'Bij de aanvaarding van nieuwe leden (omstreeks de pensioengerechtigde leeftijd) wordt rekening gehouden met: de leidinggevende functie die de kandidaat in zijn beroepsleven heeft vervuld; de sociale– en/of de economische verantwoordelijkheid die de kandidaat heeft gedragen in, en eventueel buiten het beroepsleven; de bereidheid om de intermenselijke contacten levend te houden en verder te ontplooien.',
                'De samenkomsten (meestal 1× tot 2× per maand) staan in het teken van solidariteit en vriendschap tussen de leden.',
                'Criteria voor het aanvaarden van nieuwe leden: Nieuwe leden kunnen uitsluitend op uitnodiging lid worden. Een nieuw lid moet door een of twee peters, leden van de club, worden voorgesteld. Nieuwe leden dienen bij voorkeur woonachtig te zijn in de eigen regio. Het opnemen van nieuwe leden dient zorgvuldig te geschieden aan de hand van het eigen clubreglement. Indien beide echtgenoten of partners de intentie zouden hebben tot Probus toe te treden moeten zij, ieder afzonderlijk, beantwoorden aan de criteria die noodzakelijk zijn voor het lidmaatschap.',
                'Het is aan te raden vanaf de start van de club regelmatig nieuwe leden aan te werven en zorg te dragen voor een gelijkwaardige spreiding van alle leeftijden. Zo wordt verstarring voorkomen.',
                'De uitwisseling van kennis en interesse door activiteiten van eigen leden is een waardevolle betrachting. Het is dus belangrijk hen te stimuleren tot het organiseren van spreekbeurten en uitstappen.',
                'Een Probusclub is zogenaamd een "feitelijke vereniging" en kan dus geen onroerende goederen bezitten. Een jaarlijkse budgetopstelling en opvolging betreffende inkomsten en uitgaven is aanbevelenswaardig.',
                'De goede relatie tussen clubs, vooral uit eigen regio, is aangewezen en nuttig.',
                'Met respect voor autonomie van de clubs wordt toch aanbevolen dat het bestuur zou bestaan uit een voorzitter, een ondervoorzitter, een secretaris, een penningmeester en eventueel een clubmeester. De duur van de mandaten en de aanduiding van de bestuursleden worden door het interne reglement van de club bepaald.',
                'Een Probusclub is geen serviceclub.',
                'Voor alle nieuwe clubs begint het Probusjaar op 1 januari. De bestaande clubs die nog een andere jaarlijkse begindatum hebben worden dringend verzocht hun huishoudelijk reglement in die zin aan te passen, ten einde meer eenvormigheid te bereiken voor het geheel van de Belgische clubs.',
                'Iedere Probusclub kan volledig zelfstandig een reglement van inwendige orde opstellen. Dit reglement mag echter niet in tegenspraak zijn met het kaderreglement van het C.I.C. Probus Belgium. Het C.I.C. kan om gegronde redenen een club het recht ontzeggen het logo en de naam van Probusclub te dragen.',
            ),
        ],
    },
};

// ─── API calls ───────────────────────────────────────────────────────────────

async function login() {
    const res = await fetch(`${BASE}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
    });
    if (!res.ok) throw new Error(`Login mislukt: ${res.status} ${await res.text()}`);
    const data = await res.json();
    return data.token;
}

async function findExisting(token) {
    const res = await fetch(`${BASE}/api/paginas?where[slug][equals]=huisreglement&limit=1`, {
        headers: { Authorization: `JWT ${token}` },
    });
    const data = await res.json();
    return data.docs?.[0] ?? null;
}

async function createPage(token) {
    const res = await fetch(`${BASE}/api/paginas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({
            slug: 'huisreglement',
            titel: 'Huisreglement',
            subtitel: 'Probus "Leiegalm" Menen–Wevelgem',
            inhoud: inhoud,
        }),
    });
    if (!res.ok) throw new Error(`Aanmaken mislukt: ${res.status} ${await res.text()}`);
    return res.json();
}

async function updatePage(token, id) {
    const res = await fetch(`${BASE}/api/paginas/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({
            titel: 'Huisreglement',
            subtitel: 'Probus "Leiegalm" Menen–Wevelgem',
            inhoud: inhoud,
        }),
    });
    if (!res.ok) throw new Error(`Update mislukt: ${res.status} ${await res.text()}`);
    return res.json();
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log(`CMS: ${BASE}`);
console.log('Inloggen…');
const token = await login();
console.log('Ingelogd.');

const existing = await findExisting(token);
if (existing) {
    console.log(`Bestaande pagina gevonden (id=${existing.id}). Bijwerken…`);
    await updatePage(token, existing.id);
    console.log('Bijgewerkt.');
} else {
    console.log('Geen bestaande pagina. Aanmaken…');
    const doc = await createPage(token);
    console.log(`Aangemaakt (id=${doc.doc?.id ?? doc.id}).`);
}

console.log('Klaar. De huisreglement pagina is beschikbaar via /leden/portaal/huisreglement.');

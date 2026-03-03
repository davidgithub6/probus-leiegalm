/**
 * Seed script – imports the 2026 Probus Leiegalm agenda into the CMS.
 * Usage:
 *   1. Add CMS_ADMIN_PASSWORD=yourpassword to cms/.env
 *   2. Make sure the CMS dev server is running (npm run dev in cms/)
 *   3. node seed.mjs
 */
import { readFileSync } from 'fs'

// Read .env manually (avoid needing dotenv on PATH)
const env = Object.fromEntries(
    readFileSync(new URL('.env', import.meta.url), 'utf8')
        .split('\n')
        .filter(l => l && !l.startsWith('#'))
        .map(l => l.split('=').map(s => s.trim()))
)

const EMAIL = env.CMS_ADMIN_EMAIL || 'davidjoseph@speedymail.org'
const PASSWORD = env.CMS_ADMIN_PASSWORD
const BASE = 'http://localhost:3000'

if (!PASSWORD) {
    console.error('❌  Add CMS_ADMIN_PASSWORD=yourpassword to cms/.env and retry.')
    process.exit(1)
}

// ── 1. Login ──────────────────────────────────────────────────────────────
const loginRes = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
})
const loginData = await loginRes.json()
if (!loginData.token) {
    console.error('❌  Login failed:', JSON.stringify(loginData))
    process.exit(1)
}
const token = loginData.token
console.log(`✅  Logged in as ${EMAIL}\n`)

// ── 2. Event data ──────────────────────────────────────────────────────────
const events = [
    {
        titel: 'Nieuwjaarsdinner met partners',
        datum: '2026-01-08T12:00:00.000Z',
        categorie: 'Diner',
        locatie: 'Nader te bepalen',
        uitgelicht: true,
    },
    {
        titel: 'Wandeling Ieper vestingen',
        datum: '2026-01-16T09:30:00.000Z',
        categorie: 'Uitstap',
        locatie: 'Ieper',
    },
    {
        titel: 'Vergadering – Dr. Elien Mahieu over niergezondheid',
        datum: '2026-02-05T14:00:00.000Z',
        categorie: 'Lezing',
        locatie: 'Restaurant Vijverhof, Wevelgem',
    },
    {
        titel: 'Voorzittersdag',
        datum: '2026-02-06T10:00:00.000Z',
        categorie: 'Vergadering',
        locatie: 'De Oude Melkerij, Gits',
    },
    {
        titel: 'Wandeling Palingbeek',
        datum: '2026-02-12T09:30:00.000Z',
        categorie: 'Uitstap',
        locatie: 'Ieper',
    },
    {
        titel: 'Vergadering – Jan Parmentier over mobiliteit',
        datum: '2026-03-05T14:00:00.000Z',
        categorie: 'Lezing',
        locatie: 'Restaurant Vijverhof, Wevelgem',
    },
    {
        titel: 'Wandeling o.l.v. Luc Mahieu',
        datum: '2026-03-12T09:30:00.000Z',
        categorie: 'Uitstap',
        locatie: 'West-Vleteren',
    },
    {
        titel: 'Vergadering – Paul Vancraeyveldt over Franse presidentsvrouwen',
        datum: '2026-04-02T14:00:00.000Z',
        categorie: 'Lezing',
        locatie: 'Restaurant Vijverhof, Wevelgem',
    },
    {
        titel: 'Wandeling Hill 62',
        datum: '2026-04-17T09:30:00.000Z',
        categorie: 'Uitstap',
        locatie: 'Hill 62, Zillebeke',
    },
    {
        titel: 'Regionale dag met partners',
        datum: '2026-05-05T09:00:00.000Z',
        categorie: 'Uitstap',
        locatie: 'Brugge',
        uitgelicht: true,
    },
    {
        titel: 'Stille vergadering',
        datum: '2026-05-07T14:00:00.000Z',
        categorie: 'Vergadering',
        locatie: 'Restaurant Vijverhof, Wevelgem',
    },
    {
        titel: 'Wandeling Zandvoorde',
        datum: '2026-05-22T09:30:00.000Z',
        categorie: 'Uitstap',
        locatie: 'Zandvoorde',
    },
    {
        titel: 'Driedaagse reis Normandië met partners',
        datum: '2026-05-27T08:00:00.000Z',
        categorie: 'Uitstap',
        locatie: 'Normandië',
        uitgelicht: true,
    },
    {
        titel: 'Bezoek Klaratex & lunch met partners',
        datum: '2026-06-04T10:00:00.000Z',
        categorie: 'Bedrijf',
        locatie: 'Wevelgem / Restaurant Vijverhof',
        uitgelicht: true,
    },
    {
        titel: 'Wandeling o.l.v. Johan Coopman',
        datum: '2026-06-26T09:30:00.000Z',
        categorie: 'Uitstap',
        locatie: 'Kluisbergen',
    },
    {
        titel: 'Vergadering – Notaris Luc Ghesquière over grondprijzen',
        datum: '2026-07-02T14:00:00.000Z',
        categorie: 'Lezing',
        locatie: 'Restaurant Vijverhof, Wevelgem',
    },
    {
        titel: 'Daguitstap met partners',
        datum: '2026-09-03T09:00:00.000Z',
        categorie: 'Uitstap',
        locatie: 'Poperinge',
        uitgelicht: true,
    },
    {
        titel: 'Wandeling o.l.v. Luc Bonte',
        datum: '2026-09-18T09:30:00.000Z',
        categorie: 'Uitstap',
        locatie: 'Winkel St.-Elooi',
    },
    {
        titel: 'Stille vergadering',
        datum: '2026-10-01T14:00:00.000Z',
        categorie: 'Vergadering',
        locatie: 'Restaurant Vijverhof, Wevelgem',
    },
    {
        titel: 'Wandeling De Dreve, Zonnebeke',
        datum: '2026-10-16T09:30:00.000Z',
        categorie: 'Uitstap',
        locatie: 'Zonnebeke',
    },
    {
        titel: 'Gedachtenismis & vergadering met partners',
        datum: '2026-11-05T10:00:00.000Z',
        categorie: 'Vergadering',
        locatie: 'Restaurant Vijverhof, Wevelgem',
        uitgelicht: true,
    },
    {
        titel: 'Wandeling Geluveld',
        datum: '2026-11-20T09:30:00.000Z',
        categorie: 'Uitstap',
        locatie: 'Geluveld',
    },
    {
        titel: 'Algemene vergadering & verkiezing ondervoorzitter',
        datum: '2026-12-03T14:00:00.000Z',
        categorie: 'Vergadering',
        locatie: 'Restaurant Vijverhof, Wevelgem',
        uitgelicht: true,
    },
    {
        titel: 'Wandeling Ieper vestingen',
        datum: '2026-12-10T09:30:00.000Z',
        categorie: 'Uitstap',
        locatie: 'Ieper',
    },
    {
        titel: 'Nieuwjaarsdinner & voorzittersinhuldiging 2027',
        datum: '2027-01-07T12:00:00.000Z',
        categorie: 'Diner',
        locatie: 'Nader te bepalen',
        uitgelicht: true,
    },
]

// ── 3. Create events ───────────────────────────────────────────────────────
let created = 0
for (const ev of events) {
    const res = await fetch(`${BASE}/api/evenementen`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(ev),
    })
    if (res.ok) {
        created++
        console.log(`✓  ${ev.datum.slice(0, 10)}  ${ev.titel}`)
    } else {
        const err = await res.json()
        console.error(`✗  ${ev.titel}:`, JSON.stringify(err.errors ?? err))
    }
}

console.log(`\n🎉  Done — created ${created} of ${events.length} events.`)

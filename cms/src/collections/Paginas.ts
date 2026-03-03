import type { CollectionConfig } from 'payload'

export const Paginas: CollectionConfig = {
    slug: 'paginas',
    admin: {
        useAsTitle: 'titel',
        defaultColumns: ['titel', 'slug'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'slug',
            type: 'text',
            label: 'URL Slug',
            required: true,
            unique: true,
            admin: {
                description: 'Unieke URL identifier (bv. "betekenis", "historiek", "hymne", "homepage")',
            },
        },
        {
            name: 'titel',
            type: 'text',
            label: 'Pagina titel',
            required: true,
        },
        {
            name: 'subtitel',
            type: 'text',
            label: 'Ondertitel',
        },
        {
            name: 'label',
            type: 'text',
            label: 'Label (bv. "Visie & Missie")',
        },
        {
            name: 'inhoud',
            type: 'richText',
            label: 'Pagina inhoud',
        },
        {
            name: 'metaBeschrijving',
            type: 'textarea',
            label: 'Meta beschrijving (SEO)',
            admin: {
                description: 'Korte beschrijving voor zoekmachines (max 160 tekens)',
            },
        },
        // Homepage-specifieke velden
        {
            name: 'heroTekst',
            type: 'textarea',
            label: 'Hero tekst',
            admin: {
                description: 'Enkel voor homepage: de introductietekst in de hero sectie',
                condition: (data) => data?.slug === 'homepage',
            },
        },
        {
            name: 'highlights',
            type: 'array',
            label: 'Highlights',
            admin: {
                description: 'Enkel voor homepage: de drie highlight kaarten',
                condition: (data) => data?.slug === 'homepage',
            },
            maxRows: 3,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'waarde',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'beschrijving',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'citaat',
            type: 'group',
            label: 'Citaat blok',
            admin: {
                description: 'Enkel voor homepage: het citaat onderaan',
                condition: (data) => data?.slug === 'homepage',
            },
            fields: [
                {
                    name: 'tekst',
                    type: 'textarea',
                    label: 'Citaat tekst',
                },
                {
                    name: 'bron',
                    type: 'text',
                    label: 'Citaat bron',
                },
            ],
        },
    ],
}

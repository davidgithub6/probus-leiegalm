import type { CollectionConfig } from 'payload'

const MAANDEN = [
    { label: 'Januari', value: '01' },
    { label: 'Februari', value: '02' },
    { label: 'Maart', value: '03' },
    { label: 'April', value: '04' },
    { label: 'Mei', value: '05' },
    { label: 'Juni', value: '06' },
    { label: 'Juli', value: '07' },
    { label: 'Augustus', value: '08' },
    { label: 'September', value: '09' },
    { label: 'Oktober', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
]

export const Verslagen: CollectionConfig = {
    slug: 'verslagen',
    admin: {
        useAsTitle: 'werkjaar',
        defaultColumns: ['werkjaar', 'maand'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'werkjaar',
            type: 'number',
            label: 'Werkjaar',
            required: true,
            admin: {
                description: 'Bijv. 2025 of 2026',
            },
        },
        {
            name: 'maand',
            type: 'select',
            label: 'Maand',
            required: true,
            options: MAANDEN,
        },
        {
            name: 'inhoud',
            type: 'richText',
            label: 'Inhoud verslag',
        },
        {
            name: 'bijlage',
            type: 'upload',
            label: 'Bijlage (PDF)',
            relationTo: 'media',
        },
    ],
    defaultSort: '-werkjaar',
}

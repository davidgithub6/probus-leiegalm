import type { CollectionConfig } from 'payload'

export const Evenementen: CollectionConfig = {
    slug: 'evenementen',
    labels: { singular: 'Evenement', plural: 'Evenementen' },
    admin: {
        useAsTitle: 'titel',
        defaultColumns: ['titel', 'datum', 'categorie', 'locatie'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'titel',
            type: 'text',
            label: 'Titel',
            required: true,
        },
        {
            name: 'datum',
            type: 'date',
            label: 'Datum',
            required: true,
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                    displayFormat: 'dd/MM/yyyy HH:mm',
                },
            },
        },
        {
            name: 'categorie',
            type: 'select',
            label: 'Categorie',
            required: true,
            options: [
                { label: 'Vergadering', value: 'Vergadering' },
                { label: 'Lezing', value: 'Lezing' },
                { label: 'Uitstap', value: 'Uitstap' },
                { label: 'Bedrijf', value: 'Bedrijf' },
                { label: 'Diner', value: 'Diner' },
            ],
        },
        {
            name: 'locatie',
            type: 'text',
            label: 'Locatie',
            required: true,
        },
        {
            name: 'tijd',
            type: 'text',
            label: 'Tijdstip (bv. 12:00)',
        },
        {
            name: 'beschrijving',
            type: 'richText',
            label: 'Beschrijving',
        },
        {
            name: 'uitgelicht',
            type: 'checkbox',
            label: 'Uitgelicht evenement',
            defaultValue: false,
        },
    ],
    defaultSort: 'datum',
}

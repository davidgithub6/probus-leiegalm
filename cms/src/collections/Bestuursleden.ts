import type { CollectionConfig } from 'payload'

export const Bestuursleden: CollectionConfig = {
    slug: 'bestuursleden',
    labels: { singular: 'Bestuurslid', plural: 'Bestuursleden' },
    admin: {
        useAsTitle: 'naam',
        defaultColumns: ['naam', 'functie', 'volgorde'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'naam',
            type: 'text',
            label: 'Naam',
            required: true,
        },
        {
            name: 'functie',
            type: 'text',
            label: 'Functie',
            required: true,
        },
        {
            name: 'beschrijving',
            type: 'textarea',
            label: 'Beschrijving functie',
        },
        {
            name: 'foto',
            type: 'upload',
            label: 'Profielfoto',
            relationTo: 'media',
        },
        {
            name: 'volgorde',
            type: 'number',
            label: 'Sorteervolgorde',
            defaultValue: 0,
            admin: {
                step: 1,
            },
        },
    ],
    defaultSort: 'volgorde',
}

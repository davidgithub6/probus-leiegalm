import type { CollectionConfig } from 'payload'

export const WieIsWie: CollectionConfig = {
    slug: 'wie_is_wie',
    admin: {
        useAsTitle: 'naam',
        defaultColumns: ['naam', 'omschrijving', 'volgorde'],
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
            name: 'omschrijving',
            type: 'text',
            label: 'Omschrijving / titel',
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

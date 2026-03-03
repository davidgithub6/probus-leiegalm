import type { CollectionConfig } from 'payload'

export const Bestuursleden: CollectionConfig = {
    slug: 'bestuursleden',
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
            type: 'select',
            label: 'Functie',
            required: true,
            options: [
                { label: 'Voorzitter', value: 'Voorzitter' },
                { label: 'Ondervoorzitter', value: 'Ondervoorzitter' },
                { label: 'Secretaris', value: 'Secretaris' },
                { label: 'Penningmeester', value: 'Penningmeester' },
                { label: 'Activiteitencoördinator', value: 'Activiteitencoördinator' },
                { label: 'Archivaris', value: 'Archivaris' },
            ],
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

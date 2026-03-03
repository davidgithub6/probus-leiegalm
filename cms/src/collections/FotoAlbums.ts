import type { CollectionConfig } from 'payload'

export const FotoAlbums: CollectionConfig = {
    slug: 'fotoalbums',
    admin: {
        useAsTitle: 'titel',
        defaultColumns: ['titel', 'datum', 'enkelLeden'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'titel',
            type: 'text',
            label: 'Album titel',
            required: true,
        },
        {
            name: 'datum',
            type: 'date',
            label: 'Datum',
            required: true,
            admin: {
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'MMMM yyyy',
                },
            },
        },
        {
            name: 'coverAfbeelding',
            type: 'upload',
            label: 'Cover afbeelding',
            relationTo: 'media',
        },
        {
            name: 'fotos',
            type: 'array',
            label: "Foto's",
            fields: [
                {
                    name: 'afbeelding',
                    type: 'upload',
                    label: 'Afbeelding',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'beschrijving',
                    type: 'text',
                    label: 'Beschrijving',
                },
            ],
        },
        {
            name: 'enkelLeden',
            type: 'checkbox',
            label: 'Enkel zichtbaar voor leden',
            defaultValue: true,
        },
    ],
    defaultSort: '-datum',
}

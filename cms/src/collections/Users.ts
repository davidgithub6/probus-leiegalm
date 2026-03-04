import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    labels: { singular: 'Gebruiker', plural: 'Gebruikers' },
    admin: {
        useAsTitle: 'email',
    },
    auth: true,
    fields: [
        {
            name: 'naam',
            type: 'text',
            label: 'Naam',
        },
        {
            name: 'rol',
            type: 'select',
            label: 'Rol',
            defaultValue: 'admin',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Lid', value: 'lid' },
            ],
        },
    ],
}

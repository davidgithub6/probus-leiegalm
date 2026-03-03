import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            label: 'Alt tekst',
            required: true,
        },
    ],
    upload: {
        // Sharp is not available on Workers yet
        crop: false,
        focalPoint: false,
    },
}

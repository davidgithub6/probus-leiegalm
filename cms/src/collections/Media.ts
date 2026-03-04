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
        // Sharp is not available on Workers — crop disabled, focalPoint is metadata-only (no image processing)
        crop: false,
        focalPoint: true,
    },
}

import type { CollectionConfig } from 'payload'

export const Uitnodigingen: CollectionConfig = {
    slug: 'uitnodigingen',
    labels: { singular: 'Uitnodiging', plural: 'Uitnodigingen' },
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['email', 'expires_at', 'gebruikt'],
        description: 'Verstuur uitnodigingen naar nieuwe leden. Na het aanmaken wordt automatisch een e-mail verstuurd.',
    },
    access: {
        read: () => true,   // frontend validates tokens via API
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => !!req.user,
    },
    hooks: {
        beforeValidate: [
            async ({ data, operation }) => {
                if (operation === 'create' && data) {
                    const bytes = new Uint8Array(32)
                    crypto.getRandomValues(bytes)
                    const token = Array.from(bytes)
                        .map(b => b.toString(16).padStart(2, '0'))
                        .join('')
                    const expires = new Date()
                    expires.setDate(expires.getDate() + 7)
                    return {
                        ...data,
                        token,
                        expires_at: expires.toISOString(),
                        gebruikt: false,
                    }
                }
                return data
            },
        ],
        afterChange: [
            async ({ doc, operation }) => {
                if (operation !== 'create' || doc.gebruikt) return

                const resendKey = process.env.RESEND_API_KEY
                const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@probus-leiegalm.be'
                const frontendUrl = process.env.FRONTEND_URL || 'https://probus-leiegalm.david-develops.workers.dev'

                if (!resendKey) {
                    console.warn('[uitnodigingen] RESEND_API_KEY not set — invite email not sent')
                    return
                }

                const inviteUrl = `${frontendUrl}/leden/uitgenodigd/${doc.token}`
                const expiryDate = new Date(doc.expires_at).toLocaleDateString('nl-BE', {
                    day: 'numeric', month: 'long', year: 'numeric',
                })

                const res = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${resendKey}`,
                    },
                    body: JSON.stringify({
                        from: `Probus LEIEGALM <${fromEmail}>`,
                        to: doc.email,
                        subject: 'Uitnodiging — Probus LEIEGALM Ledenportaal',
                        html: `
                            <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a2a3a;">
                                <h2 style="color: #1b3a5c;">Probus LEIEGALM</h2>
                                <p>U wordt uitgenodigd om uw account aan te maken op het ledenportaal van Probus LEIEGALM Menen-Wevelgem.</p>
                                <p style="margin: 24px 0;">
                                    <a href="${inviteUrl}" style="background: #1b3a5c; color: #fff; padding: 12px 24px; text-decoration: none; display: inline-block;">
                                        Account aanmaken
                                    </a>
                                </p>
                                <p style="font-size: 14px; color: #666;">Deze uitnodiging is geldig tot ${expiryDate}.</p>
                                <p style="font-size: 12px; color: #999;">Indien u deze uitnodiging niet verwachtte, kunt u deze e-mail negeren.</p>
                            </div>
                        `,
                    }),
                }).catch((err: unknown): null => { console.error('[uitnodigingen] Fetch error:', err); return null })

                if (res && !res.ok) {
                    const body = await res.text().catch(() => '(no body)')
                    console.error(`[uitnodigingen] Resend HTTP ${res.status}: ${body}`)
                } else if (res?.ok) {
                    console.log(`[uitnodigingen] Uitnodiging verstuurd naar ${doc.email}`)
                }
            },
        ],
    },
    fields: [
        {
            name: 'email',
            type: 'email',
            label: 'E-mailadres',
            required: true,
        },
        {
            name: 'token',
            type: 'text',
            label: 'Uitnodigingstoken',
            admin: { readOnly: true },
        },
        {
            name: 'expires_at',
            type: 'date',
            label: 'Vervalt op',
            admin: { readOnly: true },
        },
        {
            name: 'gebruikt',
            type: 'checkbox',
            label: 'Gebruikt',
            defaultValue: false,
        },
    ],
}

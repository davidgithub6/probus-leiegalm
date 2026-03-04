/**
 * Minimal Lexical JSON → HTML serializer for server-side rendering.
 * Handles the common node types used by Payload's richText fields.
 */

const FORMAT = { bold: 1, italic: 2, strikethrough: 4, underline: 8, code: 16 };

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function serializeNode(node) {
    if (!node) return '';

    switch (node.type) {
        case 'root':
            return serializeChildren(node);

        case 'paragraph':
            return `<p>${serializeChildren(node) || '&nbsp;'}</p>`;

        case 'heading': {
            const tag = node.tag ?? 'h2';
            return `<${tag}>${serializeChildren(node)}</${tag}>`;
        }

        case 'list': {
            const tag = node.listType === 'number' ? 'ol' : 'ul';
            return `<${tag}>${serializeChildren(node)}</${tag}>`;
        }

        case 'listitem':
            return `<li>${serializeChildren(node)}</li>`;

        case 'link': {
            const href = escapeHtml(node.fields?.url ?? node.url ?? '#');
            const target = node.fields?.newTab ? ' target="_blank" rel="noopener"' : '';
            return `<a href="${href}"${target}>${serializeChildren(node)}</a>`;
        }

        case 'text': {
            let text = escapeHtml(node.text ?? '');
            const fmt = node.format ?? 0;
            if (fmt & FORMAT.code) text = `<code>${text}</code>`;
            if (fmt & FORMAT.bold) text = `<strong>${text}</strong>`;
            if (fmt & FORMAT.italic) text = `<em>${text}</em>`;
            if (fmt & FORMAT.underline) text = `<u>${text}</u>`;
            if (fmt & FORMAT.strikethrough) text = `<s>${text}</s>`;
            return text;
        }

        case 'linebreak':
            return '<br>';

        case 'horizontalrule':
            return '<hr>';

        case 'quote':
            return `<blockquote>${serializeChildren(node)}</blockquote>`;

        default:
            // Unknown node — recurse into children if present
            return serializeChildren(node);
    }
}

function serializeChildren(node) {
    if (!Array.isArray(node.children)) return '';
    return node.children.map(serializeNode).join('');
}

/**
 * Convert a Payload Lexical richText field value to an HTML string.
 * @param {object|null|undefined} lexicalRoot - The root object from Payload (has `.root` property)
 * @returns {string}
 */
export function lexicalToHtml(lexicalRoot) {
    if (!lexicalRoot) return '';
    const root = lexicalRoot.root ?? lexicalRoot;
    return serializeNode(root);
}

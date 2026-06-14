export function flattenTree(nodes = []) { return nodes.flatMap(node => [node, ...flattenTree(node.children || [])]); }
export function contentIcon(type) { return { VIDEO: 'bi-play-circle', YOUTUBE: 'bi-youtube', PDF: 'bi-file-pdf', IMAGE: 'bi-image', AUDIO: 'bi-music-note', HTML: 'bi-code-square', EMBED: 'bi-box-arrow-up-right' }[type] || 'bi-file-earmark'; }

// T143: a heading that ends with "[#id]" gets exactly that anchor, so the box can link to it.
// "[#id old-id]" keeps old-id working as an alias after a rename (an empty element with that id
// sits in the heading). The marker never reaches the reader. Each such heading carries
// data-place, which scripts/settings-anchors.mjs reads from the built pages.
const MARKER = /\s*\[#([a-z0-9][a-z0-9-]*)((?:\s+[a-z0-9][a-z0-9-]*)*)\]\s*$/;

export const placeAnchors = {
  name: 'place-anchors',
  heading(node, ctx) {
    const last = node.children[node.children.length - 1];
    if (!last || last.type !== 'text') return;
    const match = MARKER.exec(last.value);
    if (!match) return;
    const [, id, rest] = match;
    const aliases = rest.trim() ? rest.trim().split(/\s+/) : [];
    const text = last.value.slice(0, match.index);
    const children = [...node.children.slice(0, -1), ...(text ? [{ type: 'text', value: text }] : [])];
    for (const alias of aliases) {
      children.push({ type: 'emphasis', data: { hName: 'span', hProperties: { id: alias, dataPlaceAlias: id } }, children: [] });
    }
    ctx.replaceNode(node, { type: 'heading', depth: node.depth, data: { hProperties: { id, dataPlace: id } }, children });
  },
};

/** Change DEFAULT_PALETTE to publish a palette for everyone. Preview choices stay in this browser. */
export const DEFAULT_PALETTE = 'plum';
export const palettes = [
  {
    id: 'plum',
    name: 'Collective warmth',
    description: 'Deep plum, marigold, and warm cream.',
    colors: ['#342139', '#f0bd51', '#fbf5e9', '#923c51'],
  },
  {
    id: 'forest',
    name: 'Rooted together',
    description: 'Forest green, sunlit gold, and soft ivory.',
    colors: ['#173e35', '#e8bd62', '#f7f5eb', '#856039'],
  },
  {
    id: 'indigo',
    name: 'Shared possibility',
    description: 'Rich indigo, apricot, and warm white.',
    colors: ['#25345c', '#f4ba86', '#faf6ef', '#8c4056'],
  },
  {
    id: 'earth',
    name: 'Common ground',
    description: 'Burgundy, terracotta, and natural linen.',
    colors: ['#4e2428', '#edb784', '#faf1e7', '#95452e'],
  },
] as const;
export type PaletteId = (typeof palettes)[number]['id'];
export function isPalette(value: unknown): value is PaletteId {
  return palettes.some((p) => p.id === value);
}

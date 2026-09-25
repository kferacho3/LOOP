import type { ImageAsset } from '@/lib/types';
import catalog from './media-catalog.json';
import overrides from './media-overrides.json';
/** Illustrative stock, not evidence of LOOP clients, staff or activity.
 * The local download script writes reviewed overrides; Sanity can replace images.
 * Keys remain stable so the seven programs keep their relationships.
 */
export const media: Record<keyof typeof catalog, ImageAsset> = { ...catalog, ...overrides };

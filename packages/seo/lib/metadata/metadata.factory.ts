import { Metadata } from './metadata.interface';

/**
 * Metadata interface to describe all the metadata fields that can be set in a document.
 * @param metadata the metadata
 * @returns Metadata configuration
 * @remarks
 * This interface covers all the metadata fields available in Next.js including title, description,
 * icons, twitter, and more. Fields such as `metadataBase` help in composing absolute URLs
 * from relative ones.
 * @example
 * ```tsx
 * defineMetadata({
 *   title: 'My Site',
 *   description: 'Welcome to My Site',
 *   alternates: {
 *     canonical: 'https://example.com',
 *     languages: {
 *       'en-US': 'https://example.com/en-US',
 *       'de-DE': 'https://example.com/de-DE'
 *     }
 *   },
 * })
 * ```
 * @see {@link https://github.com/vercel/next.js/blob/e68639f83a4853c91f60aa6044bb4502a9365996/packages/next/src/lib/metadata/types/metadata-interface.ts#L90C1-L123C6 Source}
 */
export function defineMetadata(metadata: Metadata) {
  return metadata;
}

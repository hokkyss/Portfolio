import type { DetailedHTMLProps, LinkHTMLAttributes, MetaHTMLAttributes } from 'react';

export type SeoMetadata = {
  links: SeoLink[];
  metas: SeoMeta[];
};

type SeoLink = DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;

type SeoMeta = DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;

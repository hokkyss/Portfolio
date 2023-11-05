'use server';

import 'server-only';

import type { ImageProps as NextImageProps } from 'next/image';

import type { Except } from '~/_common/types/common.type';

import NextImage from 'next/image';

import * as staticImages from '../assets/images';

type ImageProps = Except<NextImageProps, 'src'> & {
  name: keyof typeof staticImages;
};

export default async function Image(props: ImageProps) {
  const { name, ...rest } = props;

  return <NextImage src={staticImages[name]} {...rest} />;
}

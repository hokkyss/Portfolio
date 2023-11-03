'use server';

import 'server-only';

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn, tw } from '~/_common/utils/classname.util';

type SectionProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

const Section = async (props: SectionProps) => {
  const { className, ...rest } = props;

  return (
    <section
      className={cn(tw`pt-24 pb-32 relative flex flex-col justify-center items-center h-full gap-y-5`, className)}
      {...rest}
    />
  );
};

export default Section;

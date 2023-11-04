'use server';

import 'server-only';

import type { LucideProps } from 'lucide-react';

import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';

type LucideIconProps = Omit<LucideProps, 'ref'> & {
  name: keyof typeof dynamicIconImports;
};

export default async function LucideIcon(props: LucideIconProps) {
  const { name, ...rest } = props;

  const Component = dynamic(dynamicIconImports[name]);

  return <Component {...rest} />;
}

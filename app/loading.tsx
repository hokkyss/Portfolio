'use server';

import 'server-only';

import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';

import { tw } from './_common/utils/classname.util';

const Loader = dynamic(dynamicIconImports['loader-2']);

export default async function Loading() {
  return (
    <div className={tw`flex h-screen w-screen items-center justify-center`}>
      <Loader className={tw`h-10 w-10 animate-spin`} />
    </div>
  );
}

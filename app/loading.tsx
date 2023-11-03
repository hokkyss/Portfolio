'use server';

import 'server-only';

import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';

import { tw } from './_common/utils/classname.util';

const Loader = dynamic(dynamicIconImports['loader-2']);

export default async function Loading() {
  return (
    <div className={tw('h-full w-full flex justify-center items-center')}>
      <Loader className={tw('animate-spin w-10 h-10')} />
    </div>
  );
}

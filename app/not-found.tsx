'use server';

import 'server-only';

import Link from 'next/link';

import { tw } from './_common/utils/classname.util';
import buttonVariants from './_common/variants/button.variant';

export default async function NotFound() {
  return (
    <div>
      <h1 className={tw`tracking-normal text-4xl font-bold`}>Not Found</h1>
      <h2>Could not find requested resource</h2>
      <Link className={buttonVariants({ variant: 'link' })} href="/">
        Return Home
      </Link>
    </div>
  );
}

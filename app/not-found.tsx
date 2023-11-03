'use server';

import 'server-only';

import Link from 'next/link';

import buttonVariants from './_common/styles/button.style';
import { tw } from './_common/utils/classname.util';
import Card from './_server/molecules/card.molecule';

export default async function NotFound() {
  return (
    <div className={tw`h-full w-full flex justify-center items-center`}>
      <Card className={tw`w-80`}>
        <Card.Header>
          <Card.Title>Not Found.</Card.Title>
          <Card.Description>Could not find requested resource</Card.Description>
        </Card.Header>
        <Card.Content />
        <Card.Footer className={tw`flex flex-row justify-end items-center`}>
          <Link className={buttonVariants({ variant: 'outline' })} href="/" prefetch={false} replace target="_self">
            Return Home
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

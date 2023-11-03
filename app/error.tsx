'use client'; // Error components must be Client Components

import 'client-only';

import type ErrorBoundaryProps from './_common/types/error-props.type';

import dynamic from 'next/dynamic';

import { tw } from './_common/utils/classname.util';

const Button = dynamic(() => import('./_client/atoms/button.atom'));
const CardContent = dynamic(() => import('./_client/molecules/card-content.molecule'));
const CardDescription = dynamic(() => import('./_client/molecules/card-description.molecule'));
const CardFooter = dynamic(() => import('./_client/molecules/card-footer.molecule'));
const CardHeader = dynamic(() => import('./_client/molecules/card-header.molecule'));
const CardTitle = dynamic(() => import('./_client/molecules/card-title.molecule'));
const Card = dynamic(() => import('./_client/molecules/card.molecule'));

export default function ErrorBoundary(props: ErrorBoundaryProps) {
  const { error, reset } = props;

  return (
    <div className={tw`h-full w-full flex justify-center items-center`}>
      <Card className={tw`max-w-xl break-words`}>
        <CardHeader>
          <CardTitle>Sorry :&#40;</CardTitle>
          <CardDescription>An Error Happened on {error.digest ? 'Server' : 'Client'} Side</CardDescription>
        </CardHeader>
        <CardContent>
          <p className={tw`text-lg text-red-500`}>{error.message}</p>
        </CardContent>
        <CardFooter className={tw`flex flex-row justify-end items-center`}>
          <Button onClick={reset} type="button" variant="default">
            Reload
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

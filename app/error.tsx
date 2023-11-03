'use client'; // Error components must be Client Components

import 'client-only';

import type ErrorBoundaryProps from './_common/types/error-props.type';

import Button from './_client/atoms/button.atom';
import CardContent from './_client/molecules/card-content.molecule';
import CardDescription from './_client/molecules/card-description.molecule';
import CardFooter from './_client/molecules/card-footer.molecule';
import CardHeader from './_client/molecules/card-header.molecule';
import CardTitle from './_client/molecules/card-title.molecule';
import Card from './_client/molecules/card.molecule';
import { tw } from './_common/utils/classname.util';

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

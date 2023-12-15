import { NextResponse } from 'next/server';

import getExperiences from '~/_server/services/cms/get-experiences.service';

export async function GET() {
  const response = NextResponse.json(await getExperiences(), {
    status: 200,
  });

  return response;
}

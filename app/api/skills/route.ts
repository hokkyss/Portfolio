import { NextResponse } from 'next/server';

import getSkills from '~/_server/services/cms/get-skills.service';

export async function GET() {
  const response = NextResponse.json(await getSkills(), {
    status: 200,
  });

  return response;
}

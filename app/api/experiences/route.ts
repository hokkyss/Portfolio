import { NextResponse } from 'next/server';

import cmsService from '~/_server/services/cms/cms.service';

export async function GET() {
  const response = NextResponse.json(await cmsService.getExperiences(), {
    status: 200,
  });

  return response;
}

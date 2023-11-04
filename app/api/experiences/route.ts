import { NextResponse } from 'next/server';

export async function GET(/* request: NextRequest,
{ params }: { params: { [key: string]: string | string[] | undefined } }, */) {
  // TODO: Get data from backend/CMS
  const response = NextResponse.json(
    [
      {
        company: {
          link: 'https://www.linkedin.com/company/13357145/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BlYHY3RbkRGGTpzgZLrnmjA%3D%3D',
          name: 'GDP Labs',
        },
        description: `
Collaborated with 1 partner and 2 mentors on exploring three projects:
- Low Code Stack for Web Development using Webflow, Airtable, and Firebase
- Integrating web workers to use Angular services for work offloading
- Integrate and validate forms with Airtable
`,
        from: '2022-06-02',
        id: '1',
        role: 'Software Development Engineer Intern',
        techStacks: ['angular', 'nestjs'],
        to: '2022-08-31',
      },
    ],
    {
      status: 200,
    },
  );

  return response;
}

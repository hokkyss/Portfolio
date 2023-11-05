import { NextResponse } from 'next/server';

export async function GET(/* request: NextRequest,
{ params }: { params: { [key: string]: string | string[] | undefined } }, */) {
  // TODO: Get data from backend/CMS
  const response = NextResponse.json(
    [
      {
        company: {
          link: 'https://www.linkedin.com/company/75485763/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BlYHY3RbkRGGTpzgZLrnmjA%3D%3D',
          name: 'Nomura Research Institute Indonesia',
        },
        description: `
- Build high quality web applications that solves our client's problems.
- Write and ensure high quality codes through code reviews.
`,
        from: '2023-04-03',
        id: '1',
        role: 'Front End Engineer',
        techStacks: ['react', 'styled-components', 'redux', 'tailwindcss', 'react-query', 'typescript'],
      },
      {
        company: {
          link: 'https://www.linkedin.com/company/13357145/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BlYHY3RbkRGGTpzgZLrnmjA%3D%3D',
          name: 'GDP Labs',
        },
        description: `
Collaborated with 1 partner and 2 mentors on exploring three projects:
- Low Code Stack for Web Development using Webflow, Airtable, and Firebase
- Integrate web workers with Angular's dependency injection features
- Integrate and validate forms with Airtable
`,
        from: '2022-06-02',
        id: '2',
        role: 'Software Development Engineer Intern',
        techStacks: ['angular', 'nestjs', 'firebase', 'typescript'],
        to: '2022-08-31',
      },
      {
        company: {
          link: 'https://socl.es',
          name: 'Socl.es',
        },
        description: `
- Built Socles, an Activity Social Network Application available on both web and mobile.
- Migrated the codebase for web application from JavaScript to TypeScript.`,
        from: '2021-06-15',
        id: '3',
        role: 'Front End Intern - Fullstack Engineer',
        techStacks: [
          'react',
          'next.js',
          'react-native',
          'tailwindcss',
          'firebase',
          'postgresql',
          'django',
          'typescript',
        ],
        to: '2022-09-01',
      },
      {
        company: {
          link: 'https://www.linkedin.com/company/13306889/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BlYHY3RbkRGGTpzgZLrnmjA%3D%3D',
          name: 'Kabinet KM ITB',
        },
        description: `
- Managed a 5-men Tech and QA division together with Project Manager
- Set coding conventions for the team to work with
- Ensured high quality codes for the workspace through code reviews
`,
        from: '2021-09-01',
        id: '4',
        role: 'Lead',
        techStacks: ['typescript'],
        to: '2022-04-01',
      },
      {
        company: {
          link: 'https://www.linkedin.com/company/13306889/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BlYHY3RbkRGGTpzgZLrnmjA%3D%3D',
          name: 'Kabinet KM ITB',
        },
        description: `
Built Anmategra, performance tracking web application for students of Bandung Institute of Technology
`,
        from: '2021-09-01',
        id: '5',
        role: 'Fullstack Engineer',
        techStacks: ['react', 'node.js', 'prisma', 'express', 'mysql'],
        to: '2022-04-01',
      },
    ],
    {
      status: 200,
    },
  );

  return response;
}

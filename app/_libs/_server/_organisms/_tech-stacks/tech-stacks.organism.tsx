import 'server-only';

import TechStack from '~/_server/_molecules/_tech-stack/tech-stack.molecule';

export default async function TechStacks() {
  return (
    <>
      <TechStack
        techStacks={[
          { icon: 'c', name: 'C' },
          { icon: 'cpp', name: 'C++' },
          { icon: 'csharp', name: 'C#' },
          { icon: 'python', name: 'Python' },
          { icon: 'go', name: 'Go' },
          { icon: 'javascript', name: 'Javascript' },
          { icon: 'typescript', name: 'Typescript' },
          { icon: 'html5', name: 'HTML' },
          { icon: 'css3', name: 'CSS' },
        ]}
        title="Programming Languages"
      />
      <TechStack
        techStacks={[
          { icon: 'node.js', name: 'Node.js' },
          { icon: 'express', name: 'Express' },
          { icon: 'nestjs', name: 'NestJS' },
          { icon: 'prisma', name: 'Prisma' },
          { icon: 'sequelize', name: 'Sequelize' },
          { icon: 'flask', name: 'Flask' },
          { icon: 'django', name: 'Django REST Framework' },
          { icon: 'fastapi', name: 'FastAPI' },
          { icon: 'sqlalchemy', name: 'SQLAlchemy' },
          { icon: 'angular', name: 'Angular' },
          { icon: 'react', name: 'React' },
          { icon: 'next.js', name: 'Next.js' },
          { icon: 'react', name: 'React Native' },
          { icon: 'redux', name: 'Redux Toolkit' },
          { icon: 'react-query', name: 'React Query' },
          { icon: 'chakra-ui', name: 'Chakra UI' },
          { icon: 'mui', name: 'Material UI' },
          { icon: 'tailwindcss', name: 'Tailwind CSS' },
          { icon: 'styled-components', name: 'styled' },
        ]}
        title="Frameworks and Libraries"
      />
      <TechStack
        techStacks={[
          { icon: 'mysql', name: 'MySQL' },
          { icon: 'postgresql', name: 'PostgreSQL' },
          { icon: 'firebase', name: 'Firebase Firestore' },
          { icon: 'firebase', name: 'Firebase Realtime Database' },
        ]}
        title="Databases"
      />
      <TechStack
        techStacks={[
          { icon: 'docker', name: 'Docker' },
          { icon: 'vercel', name: 'Vercel' },
          { icon: 'netlify', name: 'Netlify' },
          { icon: 'git', name: 'Git' },
        ]}
        title="Others"
      />
    </>
  );
}

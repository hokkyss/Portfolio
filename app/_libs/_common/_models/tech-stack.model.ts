import { z } from 'zod';

const techStackSchema = z.object({
  icon: z.enum([
    // #region LANGUAGE
    'javascript',
    'typescript',
    'go',
    'python',
    'dart',
    'php',
    'c',
    'csharp',
    'cpp',
    'html5',
    'css3',
    // #endregion
    // #region FRAMEWORKS, PLATFORMS, LIBRARIES
    'node.js',
    'express',
    'prisma',
    'nestjs',
    'angular',
    'react',
    'next.js',
    'redux',
    'react-query',
    'mui',
    'chakra-ui',
    'styled-components',
    'tailwindcss',
    'cssmodules',
    'django',
    'flask',
    'fastapi',
    'vercel',
    // #endregion FRAMEWORKS, PLATFORMS, LIBRARIES
    // #region DATABASE AND ORMS
    'mysql',
    'mariadb',
    'postgresql',
    'firebase',
    // #endregion DATABASE AND ORMS
  ]),
  name: z.string(),
});

export type TechStack = z.infer<typeof techStackSchema>;

export default techStackSchema;

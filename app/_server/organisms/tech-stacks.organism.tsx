'use server';

import 'server-only';

import type { Tech } from '~/_common/models/tech.model';

import dynamic from 'next/dynamic';

const TechStack = dynamic(() => import('~/_server/molecules/tech-stack.molecule'));

interface TechStacksProps {
  tech: Tech[];
}

export default async function TechStacks({ tech }: TechStacksProps) {
  return tech.map((t) => <TechStack key={t.id} techStacks={t.techStacks} title={t.name} />);
}

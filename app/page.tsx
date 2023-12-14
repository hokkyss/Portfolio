import 'server-only';

import type DefaultPageProps from '~/_common/types/page-props.type';

import dynamic from 'next/dynamic';

import getExperiences from './_server/services/cms/get-experiences.service';
import getProjects from './_server/services/cms/get-projects.service';
import getSkills from './_server/services/cms/get-skills.service';

const Experiences = dynamic(() => import('./_server/organisms/experiences.organism'));
const Projects = dynamic(() => import('./_server/organisms/projects.organism'));
const Cursor = dynamic(() => import('./_client/atoms/cursor.atom'));
const Main = dynamic(() => import('./_server/organisms/main.organism'));
const AboutMe = dynamic(() => import('./_server/organisms/about-me.organism'));

type HomePageProps = DefaultPageProps;

export default async function Page(_props: HomePageProps) {
  const experiences = await getExperiences();
  const projects = await getProjects();
  const skills = await getSkills();

  return (
    <>
      <Cursor />
      <Main />
      <AboutMe skills={skills} />
      <Experiences experiences={experiences} />
      <Projects projects={projects} />
    </>
  );
}

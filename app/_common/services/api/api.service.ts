import experienceEndpoints from './endpoints/experiences.endpoint';
import projectEndpoints from './endpoints/projects.endpoint';

const apiEndpoints = [...experienceEndpoints, ...projectEndpoints];

export default apiEndpoints;

export interface Project {
  name: string;
  description: string;
  preview: string;
  links: {
    page: string;
    github?: string;
  };
}

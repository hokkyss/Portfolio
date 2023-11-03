import { tw } from '../utils/classname.util';

export const card = tw`rounded-lg border bg-card text-card-foreground shadow-sm`;
export const cardHeader = tw`flex flex-col space-y-1.5 p-6`;
export const cardTitle = tw`text-2xl font-semibold leading-none tracking-tight`;
export const cardDescription = tw`text-sm text-muted-foreground`;
export const cardContent = tw`p-6 pt-0`;
export const cardFooter = tw`flex items-center p-6 pt-0`;

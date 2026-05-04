import { z } from 'zod';
import { projectModel } from '../models/project.model';

export const getProjectRequestDto = z.object({}).brand('GetProjectRequestDto');

export type GetProjectRequestDto = z.input<typeof getProjectRequestDto>;

export const getProjectResponseDto = z.array(projectModel);
export type GetProjectResponseDto = z.infer<typeof getProjectResponseDto>;

import { z } from 'zod';
import { experienceModel } from '../models/experience.model';

export const getExperienceRequestDto = z.object({}).brand('GetExperienceRequestDto');

export type GetExperienceRequestDto = z.input<typeof getExperienceRequestDto>;

export const getExperienceResponseDto = z.array(experienceModel);
export type GetExperienceResponseDto = z.infer<typeof getExperienceResponseDto>;

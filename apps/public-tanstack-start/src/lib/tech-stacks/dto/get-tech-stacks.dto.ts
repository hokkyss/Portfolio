import { z } from 'zod';
import { techModel } from '../models/tech.model';

export const getTechStacksRequestDto = z.object({}).brand('GetTechStacksRequestDto');

export type GetTechStacksRequestDto = z.input<typeof getTechStacksRequestDto>;

export const getTechStacksResponseDto = z.array(techModel);
export type GetTechStacksResponseDto = z.infer<typeof getTechStacksResponseDto>;

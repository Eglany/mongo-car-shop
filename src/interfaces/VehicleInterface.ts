import { z } from 'zod';

const Vehicle = z.object({
  model: z.string().min(3),
  year: z.number().lte(1900).gte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyVelue: z.number().int(),
});

export default Vehicle;
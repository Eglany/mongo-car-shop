import { z } from 'zod';

export const VehicleSchema = z.object({
  model: z.string().min(3),
  year: z.number().lte(2022).gte(1900),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;

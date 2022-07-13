import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export const CarSchema = VehicleSchema.extend({
  doorsQty: z.number().lte(4).gte(2),
  seatsQty: z.number().lte(7).gte(2),
});

export type Car = z.infer<typeof CarSchema>;
import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export const CarSchema = VehicleSchema.extend({
  doorsQty: z.number().lte(2).gte(4),
  seatsQty: z.number().lte(2).gte(7),
});

export type Car = z.infer<typeof CarSchema>;
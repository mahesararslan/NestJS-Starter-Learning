import { z } from 'zod';

export const createGovernmentPropertyZodSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
    location: z.string().min(10, { message: 'Location must be at least 10 characters long' }),
    price: z.number().int().positive({ message: 'Price must be a positive integer' }),
    governmentId: z.string().min(5, { message: 'Government ID must be at least 5 characters long' }),
    propertyType: z.enum(['Residential', 'Commercial', 'Industrial'], {
        errorMap: () => ({ message: 'Property type must be one of Residential, Commercial, or Industrial' }),
    }),
}).required();

export type CreateGovernmentPropertyDto = z.infer<typeof createGovernmentPropertyZodSchema>;

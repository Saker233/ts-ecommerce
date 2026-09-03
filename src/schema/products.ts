import { z } from "zod"

export const createProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().nonnegative(),
    tags: z.array(z.string()).default([]),
})

// No `.default([])` here: partial() would otherwise fill missing tags with []
// and an update that omits tags would wipe them.
export const updateProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().nonnegative(),
    tags: z.array(z.string()),
}).partial()

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>

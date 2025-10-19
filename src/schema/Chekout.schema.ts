import * as z from "zod"

export const CheckoutSchema = z.object({
    details : z.string().nonempty("this field can't be empty"),
    phone : z.string().regex(/^01[1025][0-9]{8}$/,"Not valid Phone number"),
    city : z.string().nonempty("this field can't be empty")
})

export type CheckoutSchemaType = z.infer<typeof CheckoutSchema > 
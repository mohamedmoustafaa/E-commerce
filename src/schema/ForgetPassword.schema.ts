import * as z from "zod"

export const ForgetPasswordSchema = z.object({
    email : z.email().nonempty("this field can't be empty"),
})

export type ForgetPasswordSchemaType = z.infer<typeof ForgetPasswordSchema > 
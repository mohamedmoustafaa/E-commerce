import * as z from "zod"

export const ResetPassSchema = z.object({
    email : z.email().nonempty("this field can't be empty"),
    newPassword : z.string().nonempty("this field can't be empty").min(6,"password must be atleast 6 number"),
})

export type ResetPasswordSchemaType = z.infer<typeof ResetPassSchema > 
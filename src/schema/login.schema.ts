import * as z from "zod"

export const LoginSchema = z.object({
    email : z.email().nonempty("this field can't be empty"),
    password : z.string().nonempty("this field can't be empty").min(6,"password must be atleast 6 number"),
})

export type LoginSchemaType = z.infer<typeof LoginSchema > 
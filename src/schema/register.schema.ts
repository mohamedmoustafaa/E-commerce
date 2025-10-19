import * as z from "zod"

export const signUpSchema = z.object({
    name : z.string().nonempty("this field can't be empty").min(2,"min length is 2 chars").max(10,"Max length is 10 chars"),
    email : z.email().nonempty("this field can't be empty"),
    password : z.string().nonempty("this field can't be empty").min(6,"password must be atleast 6 number"),
    rePassword : z.string().nonempty("this field can't be empty"),
    phone : z.string().nonempty("this field can't be empty").regex(/^(2|\+2)?01[0125][0-9]{8}$/), 
})
.refine((object)=> object.password === object.rePassword , {
    path : ['rePassword'],
    error: "pssword and rePassword not matched!!"
});
export type signUpSchemaType = z.infer<typeof signUpSchema > 
 
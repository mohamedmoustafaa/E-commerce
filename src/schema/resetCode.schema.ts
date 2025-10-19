import * as z from "zod"

export const resetCodeSchema = z.object({
    resetCode : z.string().nonempty("set your reset code"),
})

export type ResetCodeSchemaType = z.infer<typeof resetCodeSchema > 
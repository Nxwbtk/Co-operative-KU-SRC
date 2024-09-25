import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

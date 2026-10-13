import { z } from "zod";

export const SignupSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.email("Enter a valid email").trim().min(1, "Email is required"),
  password: z.string().min(8, "Password must be atleast 8 chars"),
});

export const SignInSchema = z.object({
  email: z.email().trim().min(1, "Email is required"),
  password: z.string().min(15, "Password must be atleast 15 chars"),
});

export type SignupSchema = z.infer<typeof SignupSchema>;
export type SignInSchema = z.infer<typeof SignInSchema>;

export const codeSchema = z.object({
  code: z.string().min(1, "Enter the verification code"),
});

export type CodeFormValues = z.infer<typeof codeSchema>;

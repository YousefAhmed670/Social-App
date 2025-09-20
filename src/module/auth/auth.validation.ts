import { z } from "zod";
import { RegisterDTO, ResetPasswordDTO, VerifyEmailDTO } from "./auth.dto";
import { GENDER } from "../../utilities";

export const registerSchema = z.object<RegisterDTO>({
  fullName: z.string().min(3).max(30) as unknown as string,
  email: z.email() as unknown as string,
  password: z.string().min(6).max(20) as unknown as string,
  phoneNumber: z.string().length(11).optional() as unknown as string,
  gender: z.enum(GENDER).optional() as unknown as GENDER,
});

export const loginSchema = z.object<Partial<RegisterDTO>>({
  email: z.email() as unknown as string,
  password: z.string().min(6).max(20) as unknown as string,
});

export const verifyEmailSchema = z.object<VerifyEmailDTO>({
  email: z.email() as unknown as string,
  otp: z.string().min(6).max(6) as unknown as string,
});

export const resetPasswordSchema = z.object<ResetPasswordDTO>({
  email: z.email() as unknown as string,
  otp: z.string().min(6).max(6) as unknown as string,
  password: z.string().min(6).max(20) as unknown as string,
  confirmPassword: z.string().min(6).max(20) as unknown as string,
});

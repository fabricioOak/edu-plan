import { z } from "zod";
import { EUserRoles } from "../enums/user";

export const RegisterSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(8),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  profileImg: z.url().max(500).optional(),
});

export const UserResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.string(),
  role: z.enum(EUserRoles),
  isVerified: z.boolean(),
  profileImg: z.url().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type UserResponse = z.infer<typeof UserResponseSchema>;

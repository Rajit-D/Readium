import z from "zod";

export const signUpInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().optional(),
});

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createBlogPost = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogPost = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

export type signUpInput = z.infer<typeof signUpInput>;
export type signInInput = z.infer<typeof signInInput>;
export type createBlogPost = z.infer<typeof createBlogPost>;
export type updateBlogPost = z.infer<typeof updateBlogPost>;

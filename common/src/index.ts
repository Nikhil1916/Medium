import {z} from "zod";
export const signUpInputSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
});

export const signInInputSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6),
});

export const createBlogSchema = z.object({
    title: z.string(),
    content: z.string(),
});

export const updateBlogSchema = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
});

export type signUpInput = z.infer<typeof signUpInputSchema>;
export type signInInput = z.infer<typeof signInInputSchema>;
export type createBlog = z.infer<typeof createBlogSchema>;
export type updateBlog = z.infer<typeof updateBlogSchema>;


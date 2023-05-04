import z from 'zod';

const NextAuthSessionSchema = z.object({
    expires: z.string().datetime(),
    user: z.object({
        email: z.string().email(),
    }),
});

export type NextAuthSession = z.infer<typeof NextAuthSessionSchema>;

export default NextAuthSessionSchema;

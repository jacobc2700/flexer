import z from 'zod';

import { Visibility } from './utils';

const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    password: z.string().optional(),
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
    visibility: Visibility,
    emailVerified: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
});

export type User = z.infer<typeof UserSchema>;

export default UserSchema;

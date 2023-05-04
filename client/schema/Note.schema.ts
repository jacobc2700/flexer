import z from 'zod';
import { Visibility } from './utils';

const NoteSchema = z.object({
    id: z.string().uuid(),
    user_id: z.string().uuid(),
    username: z.string(),
    title: z.string(),
    description: z.string(),
    body: z.string(),
    type: z.enum(['COMPANY', 'PROBLEM', 'UNSPECIFIED']),
    created_at: z.string().datetime({offset: true}),
    updated_at: z.string().datetime({offset: true}),
    visibility: Visibility,
    company_id: z.string().uuid().optional().nullable(),
    problem_id: z.string().uuid().optional().nullable(),
})

export type Note = z.infer<typeof NoteSchema>;

export default NoteSchema;

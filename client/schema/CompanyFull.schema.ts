import z from 'zod';
import LevelSchema from './Level.schema';
import NoteSchema from './Note.schema';

const CompanyFullSchema = z.object({
    company: z.object({
        id: z.string().uuid(),
        created_at: z.string().datetime({ offset: true }),
        company_name: z.string(),

    }),
    levels: z.array(LevelSchema),
    notes: z.array(NoteSchema),
    problems: z.object({
        id: z.string().uuid(),
        created_at: z.string().datetime({ offset: true }),
        question_title: z.string(),
        question_title_slug: z.string(),
        company_id: z.string().uuid(),
        company_name: z.string(),
    }).array(),
});

export type CompanyFull = z.infer<typeof CompanyFullSchema>;

export default CompanyFullSchema;
import z from 'zod';

const LevelSchema = z.object({
    id: z.string().uuid(),
    company_id: z.string().uuid(),
    title: z.string(),
    location: z.string(),
    level: z.string(),
    tag: z.string(),
    notes: z.string(),
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
    years_of_experience: z.number(),
    years_at_company: z.number(),
    base_salary: z.number(),
    stock_grant_value: z.number(),
    bonus: z.number(),
    yearly_compensation: z.number(),
    gender: z.enum(['MALE', 'FEMALE', 'UNSPECIFIED']),
});

export type Level = z.infer<typeof LevelSchema>;

export default LevelSchema;

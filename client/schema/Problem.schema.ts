import z from 'zod';

const ProblemSchema = z.object({
    id: z.string().uuid(),
    question_id: z.number(),
    question_title: z.string(),
    question_title_slug: z.string(),
    total_accepted: z.number(),
    total_submitted: z.number(),
    frontend_question_id: z.number(),
    difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    paid_only: z.boolean(),
});

export type Problem = z.infer<typeof ProblemSchema>;

export default ProblemSchema;

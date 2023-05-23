import z from 'zod';

import CompanyPreviewSchema from './CompanyPreview.schema';
import NoteSchema from './Note.schema';
import ProblemSchema from './Problem.schema';

export const CompaniesDataSchema = z.object({
    favorites: z.array(z.object({ company_id: z.string().uuid() })),
    companies: z.array(CompanyPreviewSchema),
});

export const ProblemsDataSchema = z.object({
    favorites: z.array(z.object({ problem_id: z.string().uuid() })),
    problems: z.array(ProblemSchema),
});

export const NotesDataSchema = z.array(NoteSchema);

export type ProblemsData = z.infer<typeof ProblemsDataSchema>;
export type CompaniesData = z.infer<typeof CompaniesDataSchema>;
export type NotesData = z.infer<typeof NotesDataSchema>;

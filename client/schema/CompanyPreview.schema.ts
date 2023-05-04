import z from 'zod';

const CompanyPreviewSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    reviews: z.number(),
    salary: z.number()
});

export type CompanyPreview = z.infer<typeof CompanyPreviewSchema>;

export default CompanyPreviewSchema;
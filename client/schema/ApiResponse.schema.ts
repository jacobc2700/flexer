import z from 'zod';

const ApiResponseSchema = z.object({
    ok: z.boolean(),
    status: z.number(),
    message: z.string(),
    data: z.unknown(),
});

export const ApiResponseOkSchema = ApiResponseSchema.extend({
    ok: z.literal(true),
});

export const ApiResponseErrorSchema = ApiResponseSchema.extend({
    ok: z.literal(false),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type ApiResponseOk = z.infer<typeof ApiResponseOkSchema>;
export type ApiResponseError = z.infer<typeof ApiResponseErrorSchema>;

export default ApiResponseSchema;

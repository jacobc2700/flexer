import z from 'zod';

export const Visibility = z.enum(['PUBLIC', 'PRIVATE', 'UNLISTED']);
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1, 'PostHog key is required'),
  NEXT_PUBLIC_POSTHOG_HOST: z
    .string()
    .url('PostHog host must be a valid URL')
    .default('https://us.i.posthog.com'),
})

export const env = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema>

import z from "zod";

export const CredenciaisApiSchema = z.object({
  chave: z.string().trim().min(1).max(255).nonempty(),
  url: z.url().default('https://web.qualityautomacao.com.br'),
})

export type Credenciais = z.infer<typeof CredenciaisApiSchema>



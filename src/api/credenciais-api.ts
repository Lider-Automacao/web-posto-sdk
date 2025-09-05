import z from "zod";

export const CredenciaisApiSchema = z.object({
  chave: z.string(),
  url: z.url().default('https://web.qualityautomacao.com.br'),
})

export type Credenciais = z.infer<typeof CredenciaisApiSchema>



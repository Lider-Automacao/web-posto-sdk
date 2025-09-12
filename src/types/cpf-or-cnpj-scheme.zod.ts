
import { CNPJ, CPF, isNullOrUndefined } from '@raicamposs/toolkit'
import z from 'zod'

const CPF_CNPJ =
  /(^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$)|(^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$)/

export const CPFOrCNPJScheme = z
  .string({})
  .trim()
  .nonempty({ message: 'CPF/CNPJ é obrigatório' })
  .regex(CPF_CNPJ, {
    message: 'CPF/CNPJ inválido',
  })
  .refine(
    (value) => {
      if (isNullOrUndefined(value)) return false
      if (CNPJ.regex.test(value)) {
        return new CNPJ(value).isValid
      }
      return new CPF(value).isValid
    },
    {
      message: 'CPF/CNPJ inválido',
    },
  )



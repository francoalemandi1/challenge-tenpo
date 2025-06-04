import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import type { ZodSchema } from 'zod'

export function useFormWithValidation<T extends Record<string, unknown>>(schema: ZodSchema) {
  const [error, setError] = useState<string | null>(null)

  const form = useForm<T>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = (onSubmit: SubmitHandler<T>) => {
    return form.handleSubmit(async data => {
      try {
        setError(null)
        await onSubmit(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    })
  }

  return {
    ...form,
    error,
    setError,
    handleSubmit,
  }
}

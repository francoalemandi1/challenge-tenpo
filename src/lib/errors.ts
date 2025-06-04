export interface HttpErrorOptions {
  statusCode: number
  message: string
  digest?: string
}

export class HttpError extends Error {
  statusCode: number
  digest?: string

  constructor({ statusCode, message, digest }: HttpErrorOptions) {
    super(message)
    this.statusCode = statusCode
    this.digest = digest
    this.name = 'HttpError'
  }
}

export const getErrorMessage = (statusCode: number) => {
  const messages = {
    400: 'Bad Request - The request could not be understood or was missing required parameters.',
    401: 'Unauthorized - Authentication failed or user lacks necessary permissions.',
    404: 'Not Found - The requested resource could not be found.',
    500: 'Internal Server Error - Something went wrong on our end.',
  } as const

  return messages[statusCode as keyof typeof messages] || messages[500]
}

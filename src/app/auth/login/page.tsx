'use client'

import { loginSchema, type LoginCredentials } from '@/types/auth'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/Card'
import { useFormWithValidation } from '@/hooks/useFormWithValidation'

export default function LoginPage() {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    error,
    formState: { errors, isSubmitting },
  } = useFormWithValidation<LoginCredentials>(loginSchema)

  const onSubmit = async (data: LoginCredentials) => {
    await login(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </CardTitle>
          <CardDescription className="mt-2 text-center text-sm text-gray-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                {...register('email')}
                type="email"
                placeholder="Email address"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <Input
                {...register('password')}
                type="password"
                placeholder="Password"
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            {error && <div className="text-center text-red-500 text-sm">{error}</div>}
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

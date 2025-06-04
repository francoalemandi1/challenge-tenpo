'use client'

import { Button } from '@/components/atoms/Button'
import { Card, CardContent, CardTitle } from '@/components/atoms/Card'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function NotFound() {
  const router = useRouter()
  const { logout } = useAuth()

  const header = (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Home</h1>
      <Button onClick={logout} variant="outline" size="sm">
        Sign out
      </Button>
    </div>
  )

  return (
    <BaseLayout header={header}>
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <CardTitle className="text-red-600 mb-4 text-center">
              404 - Página no encontrada
            </CardTitle>
            <p className="text-gray-600 text-center mb-6">
              Lo sentimos, la página que estás buscando no existe en el home.
            </p>
            <div className="flex justify-center">
              <Button onClick={() => router.push('/home')} variant="outline">
                Volver al Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  )
}

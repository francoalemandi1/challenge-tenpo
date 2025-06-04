'use client'

import { Button } from '@/components/atoms/Button'
import { Card, CardContent, CardTitle } from '@/components/atoms/Card'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <CardTitle className="text-red-600 mb-4 text-center">
            404 - Página no encontrada
          </CardTitle>
          <p className="text-gray-600 text-center mb-6">
            Lo sentimos, la página que estás buscando no existe.
          </p>
          <div className="flex justify-center">
            <Button onClick={() => router.push('/')} variant="outline">
              Volver al Inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

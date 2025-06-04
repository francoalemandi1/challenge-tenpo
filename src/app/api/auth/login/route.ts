import { NextResponse } from 'next/server'
import { loginSchema } from '@/types/auth'
import { generateToken, COOKIE_NAME } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    console.log('🚀 Login attempt started')
    const body = await request.json()
    console.log('📝 Request body:', { email: body.email })

    // Validate request body against schema
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      console.log('❌ Validation failed:', result.error.errors)
      return NextResponse.json(
        {
          error: 'Invalid credentials format',
          details: result.error.errors,
        },
        { status: 400 }
      )
    }

    const { email, password } = result.data
    console.log('✅ Validation passed')

    // In a real app, you would validate credentials against a database
    // For demo purposes, accept any valid email with password longer than 6 chars
    if (password.length < 6) {
      console.log('❌ Password too short')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Generate token
    const token = generateToken({
      id: '1',
      email,
      role: 'user',
    })
    console.log('🔑 Token generated')

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: '1',
          email,
          role: 'user',
        },
      },
      { status: 200 }
    )

    // Set cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours in seconds
    })
    console.log('🍪 Cookie set:', COOKIE_NAME)

    return response
  } catch (error) {
    console.error('❌ Login error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }
}

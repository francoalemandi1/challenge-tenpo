import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { loginSchema } from '@/types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '30d';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body against schema
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { 
          error: 'Invalid credentials format',
          details: result.error.errors
        },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // In a real app, you would validate credentials against a database
    // For demo purposes, accept any valid email with password longer than 6 chars
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: '1',
        email,
        role: 'user',
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    const response = NextResponse.json({
      token,
      user: {
        id: '1',
        email,
        role: 'user',
      },
    });

    // Set the token as an HTTP-only cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
} 
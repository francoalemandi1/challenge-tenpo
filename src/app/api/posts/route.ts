import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')

    if (!token?.value) {
      return NextResponse.json({ error: 'Unauthorized - No token provided' }, { status: 401 })
    }

    const { data } = await api.get('/posts', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in /api/posts:', error)

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      return NextResponse.json(
        { error: error.response?.data?.message || 'Failed to fetch posts' },
        { status: error.response?.status || 500 }
      )
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server';

const EXTERNAL_API_BASE_URL = 'https://suitmedia-backend.suitdev.com/api/ideas';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const queryParams = new URLSearchParams(searchParams);
  const url = `${EXTERNAL_API_BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://api.kie.ai/api/v1';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');
    const apiKey = searchParams.get('apiKey');

    if (!taskId) {
      return NextResponse.json({ error: 'Missing taskId' }, { status: 400 });
    }

    const authHeader = apiKey || request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Missing authorization' }, { status: 401 });
    }

    const response = await fetch(`${API_BASE}/jobs/recordInfo?taskId=${taskId}`, {
      headers: {
        'Authorization': authHeader,
      },
    });

    const data = await response.json();
    return NextResponse.json(data.data || data);
  } catch (error) {
    console.error('Query task error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
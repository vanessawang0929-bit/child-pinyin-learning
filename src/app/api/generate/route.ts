import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://api.kie.ai/api/v1';

export async function POST(request: NextRequest) {
  try {
    const { prompt, apiKey, aspect_ratio, resolution } = await request.json();

    if (!prompt || !apiKey) {
      return NextResponse.json({ error: 'Missing prompt or apiKey' }, { status: 400 });
    }

    const response = await fetch(`${API_BASE}/jobs/createTask`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'nano-banana-pro',
        input: {
          prompt,
          image_input: [],
          aspect_ratio: aspect_ratio || '3:4',
          resolution: resolution || '2K',
          output_format: 'png',
        },
      }),
    });

    const data = await response.json();

    if (data.code !== 200) {
      return NextResponse.json({ error: data.msg || '创建任务失败' }, { status: 400 });
    }

    return NextResponse.json({ taskId: data.data.taskId });
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
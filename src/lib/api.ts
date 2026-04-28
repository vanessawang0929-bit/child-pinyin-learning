const API_BASE = 'https://api.kie.ai/api/v1';

export interface CreateTaskRequest {
  prompt: string;
  aspect_ratio?: string;
  resolution?: string;
  output_format?: string;
  callBackUrl?: string;
}

export interface CreateTaskResponse {
  code: number;
  msg: string;
  data: {
    taskId: string;
  };
}

export interface TaskStatusResponse {
  code: number;
  msg: string;
  data: {
    taskId: string;
    model: string;
    state: 'waiting' | 'success' | 'fail';
    param: string;
    resultJson: string | null;
    failCode: string | null;
    failMsg: string | null;
    costTime: number | null;
    completeTime: number | null;
    createTime: number;
  };
}

export async function createGenerationTask(
  apiKey: string,
  request: CreateTaskRequest
): Promise<string> {
  const response = await fetch(`${API_BASE}/jobs/createTask`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'nano-banana-pro',
      input: {
        prompt: request.prompt,
        image_input: [],
        aspect_ratio: request.aspect_ratio || '3:4',
        resolution: request.resolution || '2K',
        output_format: request.output_format || 'png',
      },
      callBackUrl: request.callBackUrl,
    }),
  });

  const data: CreateTaskResponse = await response.json();

  if (data.code !== 200) {
    throw new Error(`Failed to create task: ${data.msg}`);
  }

  return data.data.taskId;
}

export async function queryTaskStatus(
  apiKey: string,
  taskId: string
): Promise<TaskStatusResponse> {
  const response = await fetch(
    `${API_BASE}/jobs/recordInfo?taskId=${taskId}`,
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    }
  );

  return response.json();
}

export function extractImageUrls(resultJson: string): string[] {
  try {
    const parsed = JSON.parse(resultJson);
    if (parsed.resultUrls && Array.isArray(parsed.resultUrls)) {
      return parsed.resultUrls;
    }
    return [];
  } catch {
    return [];
  }
}

export async function pollTaskUntilComplete(
  apiKey: string,
  taskId: string,
  onProgress?: (state: string) => void,
  maxAttempts = 60,
  intervalMs = 5000
): Promise<string[]> {
  for (let i = 0; i < maxAttempts; i++) {
    const status = await queryTaskStatus(apiKey, taskId);

    if (status.data.state === 'success') {
      return extractImageUrls(status.data.resultJson || '');
    }

    if (status.data.state === 'fail') {
      throw new Error(`Task failed: ${status.data.failMsg}`);
    }

    onProgress?.(status.data.state);
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error('Task polling timeout');
}
'use client';

import { useState } from 'react';
import Anthropic from '@anthropic-ai/sdk';
import { CHILDREN_NEWSPAPER_SYSTEM_PROMPT } from '../lib/prompt-template';
import { PRESET_TOPICS, type PresetItem } from '../lib/presets';

const anthropic = new Anthropic();

interface FormData {
  topic: string;
  title: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({ topic: '', title: '' });
  const [selectedPreset, setSelectedPreset] = useState<PresetItem | null>(null);
  const [step, setStep] = useState<'select' | 'input' | 'confirm'>('select');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [editedPrompt, setEditedPrompt] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'generating' | 'polling' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handlePresetSelect = (preset: PresetItem) => {
    setSelectedPreset(preset);
    setFormData({ topic: preset.topic, title: '' });
    setStep('input');
  };

  const handleGeneratePrompt = async () => {
    if (!formData.topic || !formData.title) return;

    setStatus('generating');
    setError('');

    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-7-20250514',
        max_tokens: 4096,
        system: CHILDREN_NEWSPAPER_SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `请为儿童识字小报生成提示词。主题/场景：${formData.topic}，标题：${formData.title}`,
          },
        ],
      });

      const promptText = response.content[0].type === 'text' ? response.content[0].text : '';
      const codeBlockMatch = promptText.match(/```markdown\n([\s\S]*?)\n```/);
      const extractedPrompt = codeBlockMatch ? codeBlockMatch[1] : promptText;

      setGeneratedPrompt(extractedPrompt);
      setEditedPrompt(extractedPrompt);
      setStep('confirm');
      setStatus('idle');
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成提示词失败');
      setStatus('error');
    }
  };

  const handleConfirmPrompt = async () => {
    if (!apiKey) {
      setError('请输入 API Key');
      return;
    }

    setStatus('polling');
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: editedPrompt,
          apiKey,
          aspect_ratio: '3:4',
          resolution: '2K',
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      pollForResult(data.taskId);
    } catch (err) {
      setError(err instanceof Error ? err.message : '创建任务失败');
      setStatus('error');
    }
  };

  const pollForResult = async (taskId: string) => {
    const maxAttempts = 60;
    const intervalMs = 5000;

    for (let i = 0; i < maxAttempts; i++) {
      try {
        const response = await fetch(`/api/task-status?taskId=${taskId}`);
        const data = await response.json();

        if (data.state === 'success') {
          const urls = JSON.parse(data.resultJson || '{}').resultUrls || [];
          setImageUrls(urls);
          setStatus('success');
          return;
        }

        if (data.state === 'fail') {
          throw new Error(data.failMsg || '生成失败');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '查询状态失败');
        setStatus('error');
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }

    setError('等待超时');
    setStatus('error');
  };

  const handleReset = () => {
    setFormData({ topic: '', title: '' });
    setSelectedPreset(null);
    setStep('select');
    setGeneratedPrompt('');
    setEditedPrompt('');
    setImageUrls([]);
    setStatus('idle');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
          儿童识字小报生成器
        </h1>

        {status === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Step 1: Select Preset Topic */}
        {step === 'select' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">选择主题</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PRESET_TOPICS.map((preset) => (
                <button
                  key={preset.topic}
                  onClick={() => handlePresetSelect(preset)}
                  className="p-4 border border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-colors text-center"
                >
                  <span className="text-lg font-medium text-gray-800">{preset.topic}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setStep('input')}
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                或者自定义主题 →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Input Topic and Title */}
        {step === 'input' && (
          <div className="space-y-4">
            {selectedPreset && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-orange-800">已选择: {selectedPreset.topic}</span>
                  <button
                    onClick={() => {
                      setSelectedPreset(null);
                      setFormData({ topic: '', title: '' });
                    }}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    更换
                  </button>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">推荐标题：</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPreset.titles.map((title) => (
                      <button
                        key={title}
                        onClick={() => setFormData({ ...formData, title })}
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.title === title
                            ? 'bg-orange-500 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:border-orange-400'
                        }`}
                      >
                        {title}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedPreset && (
                  <div className="mt-3 pt-3 border-t border-orange-200">
                    <p className="text-sm text-gray-600 mb-2">预设词汇预览：</p>
                    <div className="flex flex-wrap gap-1 text-xs">
                      {[
                        ...selectedPreset.words.coreRoles,
                        ...selectedPreset.words.commonItems,
                        ...selectedPreset.words.environment,
                      ].map((word, i) => (
                        <span key={i} className="bg-white px-2 py-1 rounded border border-gray-200">
                          {word.hanzi}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    主题/场景
                  </label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="如：超市、医院、公园"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    小报标题
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="如：《走进超市》《快乐医院》"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <button
                  onClick={handleGeneratePrompt}
                  disabled={!formData.topic || !formData.title || status === 'generating'}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {status === 'generating' ? '生成中...' : '生成提示词'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirm and Generate */}
        {step === 'confirm' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">编辑提示词</h2>
              <p className="text-sm text-gray-500 mb-4">
                请确认或修改以下提示词，然后输入 API Key 开始生成图片
              </p>

              <textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm"
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key (kie.ai)
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="输入您的 API Key"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleConfirmPrompt}
                  disabled={status === 'polling'}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {status === 'polling' ? '生成中...' : '确认并生成图片'}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  重新开始
                </button>
              </div>
            </div>

            {status === 'polling' && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded text-center">
                正在生成图片，请稍候...
              </div>
            )}

            {status === 'success' && imageUrls.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">生成结果</h2>
                <div className="grid gap-4">
                  {imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Generated ${index + 1}`}
                      className="w-full rounded-lg"
                    />
                  ))}
                </div>
                <button
                  onClick={handleReset}
                  className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  生成下一张
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
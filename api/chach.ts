type Message = { role: 'user' | 'assistant'; text: string };
type Request = { method?: string; body?: { messages?: Message[] } };
type Response = { status: (code: number) => Response; json: (value: unknown) => void; setHeader: (name: string, value: string) => void };

const CHACH_SYSTEM_PROMPT = 'Ты — образовательный советник Chach. Отвечай ТОЛЬКО на вопросы об учёбе, университетах, специальностях, программах, стипендиях, грантах и поступлении. На любые другие темы вежливо отказывай и возвращай разговор к теме образования. Общайся дружелюбно и по-человечески.';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ error: 'ANTHROPIC_API_KEY is not configured' });
  const messages = req.body?.messages;
  if (!Array.isArray(messages) || messages.some(({ role, text }) => !['user', 'assistant'].includes(role) || typeof text !== 'string')) {
    return res.status(400).json({ error: 'messages must be an array of { role, text }' });
  }
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 800, system: CHACH_SYSTEM_PROMPT, messages: messages.map(({ role, text }) => ({ role, content: text })) })
    });
    const data = await response.json() as { content?: { text?: string }[]; error?: { message?: string } };
    if (!response.ok) throw new Error(data.error?.message || 'Anthropic request failed');
    return res.status(200).json({ text: data.content?.[0]?.text || '' });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Chach request failed' });
  }
}

const OPENAI_CHAT_COMPLETIONS_API =
  'https://api.openai.com/v1/chat/completions'
const OPENAI_SECRET = import.meta.env.VITE_APP_OPENAI_SECRET

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const useChatCompletion = () => {
  const request = async (messages: Message[]): Promise<Message | undefined> => {
    const body = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
    })

    const res = await fetch(OPENAI_CHAT_COMPLETIONS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_SECRET}`,
      },
      body,
    })
    const data = await res.json()

    return data.choices[0].message
  }

  return { request }
}

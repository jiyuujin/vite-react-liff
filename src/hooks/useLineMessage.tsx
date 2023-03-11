import { Status } from './useLine'

interface UseLineMessageProps {
  liff: any | null;
  status: Status;
}

export const useLineMessage = ({ liff, status }: UseLineMessageProps) => {
  const sendMessages = async () => {
    if (status !== 'inited') return

    await liff?.sendMessages([
      {
        type: 'text',
        text: 'Hello World',
      },
    ])
  }

  return {
    sendMessages,
  }
}

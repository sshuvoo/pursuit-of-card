'use client'

import { sendMessage } from '@/actions/send-message'
import { IconArrowNarrowRight } from '@tabler/icons-react'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import SubmitButton from '../button/submit-button'

export function GameChatForm({ game_id }: { game_id: string }) {
   const formRef = useRef<HTMLFormElement>(null)

   const handleSend = async (formData: FormData) => {
      const message = formData.get('message')?.toString() || ''
      if (message) {
         try {
            await sendMessage(message, game_id)
            toast.success('Message sent!')
            if (formRef.current instanceof HTMLFormElement) {
               formRef.current.reset()
            }
         } catch (error) {
            toast.error('Failed to sent!')
         }
      } else {
         toast.error('Please type something')
      }
   }

   return (
      <form
         ref={formRef}
         action={handleSend}
         className="relative md:h-16 h-12 w-full max-w-[700px]"
      >
         <input
            className="h-full w-full md:rounded-full rounded-lg bg-[#1e1e1e] md:px-8 px-4 md:text-xl focus:outline-none"
            placeholder="Have fun while playing..."
            name="message"
         />
         <SubmitButton loadingMessage="Sending" title="Send">
            <IconArrowNarrowRight />
         </SubmitButton>
      </form>
   )
}

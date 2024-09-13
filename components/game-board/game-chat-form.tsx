'use client'

import { sendMessage } from '@/actions/send-message'
import { IconArrowNarrowRight } from '@tabler/icons-react'
import { useRef } from 'react'
import toast from 'react-hot-toast'

export function GameChatForm({ game_id }: { game_id: string }) {
   const formRef = useRef<HTMLFormElement>(null)

   const handleSend = async (formData: FormData) => {
      const message = formData.get('message')?.toString() || ''
      console.log(message)
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
         className="relative h-16 w-full max-w-[700px]"
      >
         <input
            className="h-full w-full rounded-full bg-[#1e1e1e] px-8 text-xl focus:outline-none"
            placeholder="Have fun while playing..."
            name="message"
         />
         <button
            className="absolute right-0 top-0 flex h-full items-center rounded-full bg-[#2d2d2d] px-8 text-xl"
            type="submit"
         >
            <span>Send</span>
            <IconArrowNarrowRight />
         </button>
      </form>
   )
}

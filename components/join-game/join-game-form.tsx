'use client'

import { joinGame } from '@/actions/join-game'
import { IconDeviceGamepad2 } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import SubmitButton from '../button/submit-button'

export function JoinGameForm() {
   const router = useRouter()

   const handleJoin = async (formData: FormData) => {
      const game_id = formData.get('game_id')?.toString() || ''
      if (game_id) {
         try {
            const response = await joinGame(game_id)
            toast.success(response?.message)
            router.push(`/game-board/${game_id}`)
         } catch (error) {
            if (error instanceof Error) {
               toast.error(error.message)
            } else toast.error('Failed to join')
         }
      } else {
         toast.error('Please enter game ID')
      }
   }

   return (
      <form
         action={handleJoin}
         className="relative h-12 w-full max-w-[700px] md:h-16"
      >
         <input
            className="h-full w-full rounded-lg bg-[#1e1e1e] px-4 focus:outline-none md:rounded-full md:px-8 md:text-xl"
            placeholder="Enter game ID"
            name="game_id"
         />
         <SubmitButton title="Join" loadingMessage="Joinning">
            <IconDeviceGamepad2 />
         </SubmitButton>
      </form>
   )
}

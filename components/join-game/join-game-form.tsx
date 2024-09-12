'use client'

import { joinGame } from '@/actions/join-game'
import { IconDeviceGamepad2 } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

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
      <form action={handleJoin} className="relative h-16 w-full max-w-[700px]">
         <input
            className="h-full w-full rounded-full bg-[#1e1e1e] px-8 text-xl focus:outline-none"
            placeholder="Enter game ID"
            name="game_id"
         />
         <button
            className="absolute right-0 top-0 flex h-full items-center gap-3 rounded-full bg-[#2d2d2d] px-8 text-xl"
            type="submit"
         >
            <span>Join</span>
            <IconDeviceGamepad2 />
         </button>
      </form>
   )
}

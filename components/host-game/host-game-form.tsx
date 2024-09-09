'use client'

import { hostGame } from '@/actions/host-game'
import { playClick } from '@/utils/play-sound'
import { IconCirclePlus } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function HostGameForm() {
   const router = useRouter()
   const handleHost = async () => {
      playClick()
      try {
         const response = await hostGame()
         router.push(`/game-board/${response.game_id}`)
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message)
         } else toast.error('Something went wrong')
      }
   }

   return (
      <form action={handleHost}>
         <button className="flex h-24 w-full items-center justify-center gap-4 rounded-md border-2 border-orange-400 text-2xl">
            <h2>Host</h2>
            <IconCirclePlus />
         </button>
      </form>
   )
}

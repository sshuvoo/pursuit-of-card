import { IconArrowNarrowRight, IconBan } from '@tabler/icons-react'
import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import { Player } from '@/types'
import { moveCard } from '@/actions/move-card'
import toast from 'react-hot-toast'
import { playClick } from '@/utils/play-sound'

export function SugarCard({
   children,
   index,
   isMyMove,
   card,
   player,
   game_id,
   isGameEnd,
}: {
   children: ReactNode
   index: number
   isMyMove: boolean
   card: string
   player: Player
   game_id: string
   isGameEnd: boolean
}) {
   const [isOpen, setIsOpen] = useState(false)
   // const prev_move = player?.prev_move || null
   const prev_receive = player?.prev_receive || null
   const isPassableCard =
      (prev_receive ? prev_receive !== card : card !== 'phantom') && !isGameEnd

   const handleMove = async () => {
      playClick()
      try {
         await moveCard(card, player.position, game_id)
         toast.success('Wow! great move')
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message)
         } else {
            toast.error('failed to make a move')
         }
      }
   }

   return (
      <motion.div
         layoutId={`card-first-to-second-${index}`}
         transition={{ type: 'spring', stiffness: 100, damping: 50 }}
         onMouseEnter={() => setIsOpen(true)}
         onMouseLeave={() => setIsOpen(false)}
         className="relative flex h-20 w-14 items-center justify-center rounded border-2 border-red-500 bg-black"
      >
         {children}
         {isOpen && (
            <button
               onClick={handleMove}
               disabled={!isMyMove || !isPassableCard}
               className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs font-medium text-black backdrop-blur-sm"
            >
               {isMyMove && isPassableCard ? (
                  <IconArrowNarrowRight className="h-10 w-10 text-green-500" />
               ) : (
                  <IconBan className="h-10 w-10 text-red-500" />
               )}
            </button>
         )}
      </motion.div>
   )
}

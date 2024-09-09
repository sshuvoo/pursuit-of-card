import { Player } from '@/types'

export const sortPlayerKeepingMeFirst = (
   players: Player[],
   my_position: number,
) => {
   const index = players.findIndex((player) => player.position === my_position)
   return [...players.slice(index), ...players.slice(0, index)]
}

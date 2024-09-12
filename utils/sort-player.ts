import { Player } from '@/types'

export const sortPlayerKeepingMeFirst = (
   players: Player[],
   my_position: number,
) => {
   const sortPlayers = players.sort((a, b) => a.position - b.position)
   const index = sortPlayers.findIndex(
      (player) => player.position === my_position,
   )
   return [...sortPlayers.slice(index), ...sortPlayers.slice(0, index)]
}

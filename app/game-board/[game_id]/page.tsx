import { auth } from '@/actions/auth'
import { getGame } from '@/actions/get-game'
import GameBoard from '@/components/game-board/game-board'

import { redirect } from 'next/navigation'

export default async function GameBoardPage({
   params: { game_id },
}: {
   params: { game_id: string }
}) {
   const session = await auth()
   if (!session) redirect('/guest-login')
   const game = await getGame(game_id)
   if (!game) redirect('/join-game')
      
   return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-2 xl:p-4">
         <GameBoard session={session} game_data={game} game_id={game_id} />
      </main>
   )
}

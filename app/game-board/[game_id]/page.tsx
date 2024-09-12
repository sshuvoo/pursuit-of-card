import { auth } from '@/actions/auth'
import GameBoard from '@/components/game-board/game-board'

import { redirect } from 'next/navigation'

export default async function GameBoardPage() {
   const session = await auth()
   if (!session) redirect('/guest-login')

   return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-2 xl:p-4">
         <GameBoard session={session} />
      </main>
   )
}

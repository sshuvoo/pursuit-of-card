import { auth } from '@/actions/auth'
import { JoinGameForm } from '@/components/join-game/join-game-form'
import { redirect } from 'next/navigation'

export default async function GuestLogin() {
   const session = await auth()
   if (!session) redirect('/guest-login')

   return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8">
         <h1 className="text-5xl font-semibold text-[#d3d3d3]">
            Are you ready to play?
         </h1>
         <JoinGameForm />
      </main>
   )
}

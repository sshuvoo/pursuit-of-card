import { auth } from '@/actions/auth'
import { JoinGameForm } from '@/components/join-game/join-game-form'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function GuestLogin() {
   const session = await auth()
   if (!session) redirect('/guest-login')

   return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-2 xl:p-4">
         <h1 className="text-3xl font-semibold text-[#d3d3d3] md:text-4xl xl:text-5xl">
            Are you ready to play?
         </h1>
         <JoinGameForm />
         <div className="flex gap-2">
            <Link className="underline" href={'/'}>
               Host a game & enjoy with friends
            </Link>
            {'.'}
            <Link className="underline" href={'/guidelines'}>
               Guidelines
            </Link>
         </div>
      </main>
   )
}

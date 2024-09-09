import { auth } from '@/actions/auth'
import HostGameForm from '@/components/host-game/host-game-form'
import { IconDeviceGamepad2 } from '@tabler/icons-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
   const session = await auth()
   if (!session) redirect('/guest-login')

   return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8">
         <h1 className="text-5xl font-semibold text-[#d3d3d3]">
            Welcome, {session.guest_name}
         </h1>
         <div className="grid w-full max-w-xl grid-cols-2 gap-4">
            <HostGameForm />
            <Link
               href="/join-game"
               className="flex h-24 items-center justify-center gap-4 rounded-md border-2 border-green-400 text-2xl"
            >
               <h2>Join</h2>
               <IconDeviceGamepad2 />
            </Link>
         </div>
      </main>
   )
}

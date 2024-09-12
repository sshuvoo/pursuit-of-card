import { auth } from '@/actions/auth'
import { GuestLoginForm } from '@/components/guest-login/guest-login-form'
import { redirect } from 'next/navigation'

export default async function GuestLogin() {
   const session = await auth()
   if (session) redirect('/')

   return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-2 xl:p-4">
         <h1 className="text-3xl font-semibold text-[#d3d3d3] md:text-4xl xl:text-5xl">
            Welcome to Pursuit of Card
         </h1>
         <GuestLoginForm />
      </main>
   )
}

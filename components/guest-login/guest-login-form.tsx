'use client'

import { login } from '@/actions/login'
import { IconArrowNarrowRight } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function GuestLoginForm() {
   const router = useRouter()
   const handleLogin = async (formData: FormData) => {
      const guest_name = formData.get('guest_name')?.toString() || ''
      if (guest_name) {
         try {
            const response = await login(guest_name)
            toast.success(response?.message)
            router.push('/')
         } catch (error) {
            toast.error('Failed to login')
         }
      } else {
         toast.error('Please enter your name')
      }
   }

   return (
      <form action={handleLogin} className="relative h-16 w-full max-w-[700px]">
         <input
            className="h-full w-full rounded-full bg-[#1e1e1e] px-8 text-xl focus:outline-none"
            placeholder="Enter your name"
            name="guest_name"
         />
         <button
            className="absolute right-0 top-0 flex h-full items-center rounded-full bg-[#2d2d2d] px-8 text-xl"
            type="submit"
         >
            <span>Guest Login</span>
            <IconArrowNarrowRight />
         </button>
      </form>
   )
}

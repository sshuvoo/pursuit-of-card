'use client'

import { login } from '@/actions/login'
import { IconArrowNarrowRight } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import SubmitButton from '../button/submit-button'

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
      <form
         action={handleLogin}
         className="relative h-12 w-full max-w-[700px] md:h-16"
      >
         <input
            className="h-full w-full rounded-lg bg-[#1e1e1e] px-4 focus:outline-none md:rounded-full md:px-8 md:text-xl"
            placeholder="Enter your name"
            name="guest_name"
         />
         <SubmitButton title="Guest Login" loadingMessage="Connecting">
            <IconArrowNarrowRight />
         </SubmitButton>
      </form>
   )
}

'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
   const router = useRouter()

   return (
      <button
         onClick={() => {
            router.back()
         }}
         className="rounded-lg bg-gray-600 px-6 py-2 font-semibold text-white hover:bg-gray-700"
      >
         Back
      </button>
   )
}

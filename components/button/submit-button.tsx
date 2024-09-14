import { IconLoader } from '@tabler/icons-react'
import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton({
   children,
   loadingMessage,
   title,
}: {
   children: ReactNode
   loadingMessage: string
   title: string
}) {
   const { pending } = useFormStatus()

   return (
      <button
         disabled={pending}
         className="absolute right-0 top-0 flex h-full items-center gap-2 rounded-lg bg-[#2d2d2d] px-4 text-sm md:rounded-full md:px-8 md:text-xl xl:gap-4"
         type="submit"
      >
         <span>{pending ? loadingMessage : title}</span>
         {pending ? <IconLoader className="animate-spin" /> : children}
      </button>
   )
}

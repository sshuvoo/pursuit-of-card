import { IconArrowNarrowRight } from '@tabler/icons-react'
import { ReactNode, useState } from 'react'

export function SugarCard({ children }: { children: ReactNode }) {
   const [isOpen, setIsOpen] = useState(false)
   return (
      <div
         onMouseEnter={() => setIsOpen(true)}
         onMouseLeave={() => setIsOpen(false)}
         className="relative flex h-20 w-14 items-center justify-center rounded border-2 border-red-500 bg-black"
      >
         {children}
         {isOpen && (
            <button className="absolute inset-0 flex items-center justify-center bg-[#e1ab6d] text-xs font-medium text-black">
               <IconArrowNarrowRight stroke={2} />
            </button>
         )}
      </div>
   )
}

'use server'

import { cookies } from 'next/headers'

interface Res {
   guest_id: string
   guest_name: string
}

export const auth = async () => {
   const cookie = cookies().get('access_token')
   if (cookie) {
      const access_token = cookie.value.split(';')[0].split('=')[1]
      try {
         const response = await fetch(
            `${process.env.SERVER_BASE_URL}/authentication`,
            {
               credentials: 'include',
               headers: {
                  Authorization: `Bearer ${access_token}`,
                  'Content-Type': 'application/json',
               },
            },
         )
         if (!response.ok) return null
         const json: Res = await response.json()
         return json
      } catch (error) {
         return null
      }
   } else return null
}

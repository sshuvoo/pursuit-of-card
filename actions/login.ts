'use server'

import { cookies } from 'next/headers'

export const login = async (guest_name: string) => {
   try {
      const response = await fetch(
         `${process.env.SERVER_BASE_URL}/guest-login`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guest_name }),
            credentials: 'include',
         },
      )
      if (!response.ok) throw new Error('Failed to login')
      const setCookieHeader = response.headers.getSetCookie()[0]
      if (setCookieHeader) {
         cookies().set('access_token', setCookieHeader)
      }
      const json = await response.json()
      return json
   } catch (error) {
      throw new Error('Failed to login')
   }
}

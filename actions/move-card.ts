'use server'

import { cookies } from 'next/headers'
import { auth } from './auth'

export const moveCard = async (
   card: string,
   position: number,
   game_id: string,
) => {
   const session = await auth()
   const cookie = cookies().get('access_token')
   if (!cookie || !session) throw new Error('Please login first')
   const access_token = cookie.value.split(';')[0].split('=')[1]
   const response = await fetch(`${process.env.SERVER_BASE_URL}/make-move`, {
      method: 'PUT',
      headers: {
         Authorization: `Bearer ${access_token}`,
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ card, position, game_id }),
   })
   const json = await response.json()
   if (!response.ok) throw new Error(json?.message || 'Something went wrong')
   return json
}

export type Game = {
   _id: string
   game_id: string
   player: Player[]
   createdAt: string
   updatedAt: string
   __v: number
}

export type Player = {
   guest_id: string
   guest_name: string
   position: number
   turn: boolean
   role: string
   prev_move?: string
   prev_receive?: string
   cards: string[]
   _id: string
}

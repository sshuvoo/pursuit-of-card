'use client'

import {
   IconCircle,
   IconSkull,
   IconSquare,
   IconStar,
   IconTriangle,
   IconUmbrella,
   IconUserCircle,
} from '@tabler/icons-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { SugarCard } from './sugar-card'
import { Game, Player } from '@/types'
import { sortPlayerKeepingMeFirst } from '@/utils/sort-player'
import { startGame } from '@/actions/start-game'
import toast from 'react-hot-toast'

interface Session {
   guest_id: string
   guest_name: string
}

export default function GameBoard({ session }: { session: Session }) {
   const [game, setGame] = useState<Game | null>(null)
   const params = useParams()
   const router = useRouter()

   useEffect(() => {
      let ignore = false
      const startFetching = async () => {
         const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-game/${params.game_id}`,
            { credentials: 'include' },
         )
         if (response.status === 404) router.push('/join-game')
         if (response.ok && !ignore) {
            const json = await response.json()
            setGame(json)
         }
      }
      startFetching()
      return () => {
         ignore = true
      }
   }, [params.game_id, router])

   useEffect(() => {
      const socket = io(process.env.NEXT_PUBLIC_BASE_URL!, {
         withCredentials: true,
      })
      socket.on('connect', () => {
         console.log('user connected')
      })
      socket.on('pursuit-of-card', (data) => {
         setGame(data)
      })
      return () => {
         socket.close()
      }
   }, [])

   let mydetails: Player | null = null,
      isHost: boolean = false,
      isNotStarted: boolean = false,
      joinedPlayers: Player[] = []
   console.log(game)
   if (game) {
      mydetails =
         game.player.find((p) => p.guest_id === session.guest_id) || null
      if (mydetails?.position) {
         joinedPlayers = sortPlayerKeepingMeFirst(
            game.player,
            mydetails?.position,
         )
      }
      isNotStarted = game.player.every((p) => !p.turn)
   }

   isHost = mydetails?.role === 'host-player'

   const handleStart = async () => {
      try {
         await startGame(params.game_id as string)
         toast.success('Hurray! game is start')
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message)
         } else {
            toast.error('something went wrong')
         }
      }
   }

   return (
      <>
         <div className="flex w-full max-w-3xl justify-between">
            {isNotStarted && isHost && (
               <button
                  onClick={handleStart}
                  className="rounded-md bg-green-400 px-4 py-2 font-medium text-black"
               >
                  Shuffling Cards And Start
               </button>
            )}
            {game && (
               <h2 className="text-3xl font-medium text-white/70">
                  Game ID :{' '}
                  <span className="text-pink-500">{game.game_id}</span>
               </h2>
            )}
         </div>
         <div className="flex h-96 w-full max-w-3xl flex-col justify-between rounded-md bg-[#1818188a] p-4 backdrop-blur-md">
            <div className="flex justify-evenly">
               <div className="flex flex-col items-center">
                  <IconUserCircle
                     stroke={1}
                     className={`h-10 w-10 md:h-20 md:w-20 ${joinedPlayers[3] ? 'text-[#069aa2]' : 'text-gray-500'}`}
                  />
                  <span
                     className={`text-sm ${joinedPlayers[3] ? 'text-white/75' : 'text-gray-500'}`}
                  >
                     {joinedPlayers[3] ? joinedPlayers[3].guest_name : 'Empty'}
                  </span>
               </div>
               <div className="flex flex-col items-center">
                  <IconUserCircle
                     stroke={1}
                     className={`h-10 w-10 md:h-20 md:w-20 ${joinedPlayers[2] ? 'text-[#069aa2]' : 'text-gray-500'}`}
                  />
                  <span
                     className={`text-sm ${joinedPlayers[2] ? 'text-white/75' : 'text-gray-500'}`}
                  >
                     {joinedPlayers[2] ? joinedPlayers[2].guest_name : 'Empty'}
                  </span>
               </div>
            </div>
            <div className="flex justify-between">
               <div className="flex flex-col items-center">
                  <IconUserCircle
                     stroke={1}
                     className={`h-10 w-10 md:h-20 md:w-20 ${joinedPlayers[4] ? 'text-[#069aa2]' : 'text-gray-500'}`}
                  />
                  <span
                     className={`text-sm ${joinedPlayers[4] ? 'text-white/75' : 'text-gray-500'}`}
                  >
                     {joinedPlayers[4] ? joinedPlayers[4].guest_name : 'Empty'}
                  </span>
               </div>
               <div className="flex flex-col items-center">
                  <IconUserCircle
                     stroke={1}
                     className={`h-10 w-10 md:h-20 md:w-20 ${joinedPlayers[1] ? 'text-[#069aa2]' : 'text-gray-500'}`}
                  />
                  <span
                     className={`text-sm ${joinedPlayers[1] ? 'text-white/75' : 'text-gray-500'}`}
                  >
                     {joinedPlayers[1] ? joinedPlayers[1].guest_name : 'Empty'}
                  </span>
               </div>
            </div>
            <div>
               <h2 className="mb-4 text-center text-xl">
                  {joinedPlayers[0]?.guest_name}
               </h2>
               <div className="flex justify-center gap-4">
                  {isNotStarted && (
                     <IconUserCircle
                        stroke={1}
                        className={`h-10 w-10 text-[#069aa2] md:h-20 md:w-20`}
                     />
                  )}
                  {joinedPlayers[0]?.cards.map((card) => {
                     return (
                        <SugarCard>
                           {card === 'circle' && (
                              <IconCircle className="h-10 w-10" />
                           )}
                           {card === 'triangle' && (
                              <IconTriangle className="h-10 w-10" />
                           )}
                           {card === 'star' && (
                              <IconStar className="h-10 w-10" />
                           )}
                           {card === 'umbrella' && (
                              <IconUmbrella className="h-10 w-10" />
                           )}
                           {card === 'square' && (
                              <IconSquare className="h-10 w-10" />
                           )}
                           {card === 'phantom' && (
                              <IconSkull className="h-10 w-10" />
                           )}
                        </SugarCard>
                     )
                  })}
               </div>
            </div>
         </div>
      </>
   )
}

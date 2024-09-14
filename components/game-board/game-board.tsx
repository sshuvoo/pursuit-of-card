'use client'

import { playAgain } from '@/actions/play-again'
import { startGame } from '@/actions/start-game'
import { Game, Player } from '@/types'
import {
   playGameOver,
   playJoinPlayer,
   playMessageNotification,
   playMove,
   playShuffleCards,
   playVictory,
} from '@/utils/play-sound'
import { sortPlayerKeepingMeFirst } from '@/utils/sort-player'
import {
   IconCircle,
   IconCrown,
   IconSkull,
   IconSquare,
   IconStar,
   IconTriangle,
   IconUmbrella,
   IconUserCircle,
} from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'
import { GameChatForm } from './game-chat-form'
import { SugarCard } from './sugar-card'
import { bubbleVariants } from '@/framer-variants/chat-item'

interface Session {
   guest_id: string
   guest_name: string
}

interface Chat {
   message: string | null
   guest_id: string | null
}

export default function GameBoard({
   session,
   game_data,
   game_id,
}: {
   session: Session
   game_data: Game
   game_id: string
}) {
   const [game, setGame] = useState<Game | null>(game_data)
   const [chats, setChats] = useState<Chat[]>([])

   useEffect(() => {
      const socket = io(process.env.NEXT_PUBLIC_BASE_URL!, {
         withCredentials: true,
      })
      socket.on('connect', () => {
         console.log('user connected')
      })
      socket.on(`game-chat-${game_id}`, (res_data: Chat) => {
         if (res_data.guest_id !== session.guest_id) {
            playMessageNotification()
         }
         setChats((prev) => [
            ...prev.filter((chat) => chat.guest_id !== res_data.guest_id),
            {
               message: res_data.message,
               guest_id: res_data.guest_id,
            },
         ])
         setTimeout(() => {
            setChats((prev) =>
               prev.filter((chat) => chat.guest_id !== res_data.guest_id),
            )
         }, 5000)
      })
      socket.on(`game-start-${game_id}`, playShuffleCards)
      socket.on(`game-over-${game_id}`, playGameOver)
      socket.on(`card-move-${game_id}`, playMove)
      socket.on(
         `victory-${game_id}`,
         ({ player_name, rank }: { player_name: string; rank: number }) => {
            playVictory()
            toast.success(`${player_name} is placed #${rank}`)
         },
      )
      socket.on(`join-player-${game_id}`, (player_name: string) => {
         playJoinPlayer()
         toast.success(`${player_name} is joined`)
      })
      socket.on(`pursuit-of-card-${game_id}`, (data) => {
         setGame(data)
      })
      return () => {
         socket.close()
      }
   }, [game_id, session.guest_id])

   let mydetails: Player | null = null,
      isHost: boolean = false,
      isNotStarted: boolean = false,
      isMyMove: boolean = false,
      isGameEnd: boolean = false,
      turnPlayer: Player | null = null,
      joinedPlayers: Player[] = []
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
      isGameEnd = game.player.filter((p) => p?.status === 'winner').length === 3
      if (!isNotStarted) {
         turnPlayer = game.player.find((p) => p.turn) || null
         isMyMove = joinedPlayers[0].turn
      }
   }

   isHost = mydetails?.role === 'host-player'

   const handleStart = async () => {
      try {
         await startGame(game_id)
         toast.success('Hurray! game is started')
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message)
         } else {
            toast.error('something went wrong')
         }
      }
   }

   const handlePlayAgain = async () => {
      try {
         await playAgain(game_id)
         toast.success('Hurray! restarted game')
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message)
         } else {
            toast.error('something went wrong')
         }
      }
   }

   const playerMessage1 = chats.find(
      (chat) => chat.guest_id === joinedPlayers[1]?.guest_id,
   )
   const playerMessage2 = chats.find(
      (chat) => chat.guest_id === joinedPlayers[2]?.guest_id,
   )
   const playerMessage3 = chats.find(
      (chat) => chat.guest_id === joinedPlayers[3]?.guest_id,
   )
   const playerMessage4 = chats.find(
      (chat) => chat.guest_id === joinedPlayers[4]?.guest_id,
   )

   return (
      <>
         <div className="flex w-full max-w-3xl justify-between">
            {!isNotStarted && turnPlayer && !isGameEnd && (
               <h2 className="text-xl font-semibold text-white/90">
                  Move : {turnPlayer.guest_name}
               </h2>
            )}
            {isNotStarted && isHost && (
               <button
                  onClick={handleStart}
                  className="rounded-md bg-green-400 px-4 py-2 font-medium text-black"
               >
                  Shuffling Cards And Start
               </button>
            )}
            {isGameEnd && isHost && (
               <button
                  onClick={handlePlayAgain}
                  className="rounded-md bg-green-400 px-4 py-2 font-medium text-black"
               >
                  Play Again
               </button>
            )}
         </div>
         <div className="flex w-full max-w-3xl flex-col justify-between gap-6 rounded-md bg-[#1818188a] p-4 backdrop-blur-md xl:gap-8 xl:p-8">
            <div className="flex justify-evenly">
               <div className="flex flex-col items-center">
                  <div className="relative">
                     <AnimatePresence>
                        {playerMessage3 && (
                           <motion.div
                              initial="hidden"
                              animate={'visible'}
                              exit="exit"
                              variants={bubbleVariants}
                              className="absolute bottom-20 z-[100] w-52 rounded-lg border border-[#3c3c3c] bg-black text-xs font-semibold text-green-400"
                              role="alert"
                           >
                              <div className="relative p-2">
                                 <p className="break-words">
                                    {playerMessage3.message}
                                 </p>
                                 <span className="absolute left-5 -bottom-2 z-[110] h-4 w-4 rotate-45 border-b border-r border-[#3c3c3c] bg-black"></span>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                     {joinedPlayers[3]?.status === 'winner' && (
                        <>
                           <IconCrown
                              className="absolute -top-6 left-1/2 size-10 -translate-x-1/2 text-orange-400"
                              stroke={1}
                           />
                           <h4 className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-x-[-2px] rounded-full bg-black text-3xl font-bold">
                              #{joinedPlayers[3].rank}
                           </h4>
                        </>
                     )}
                     <IconUserCircle
                        stroke={1}
                        className={`size-20 ${joinedPlayers[3] ? 'text-[#07c6d0]' : 'text-gray-500'}`}
                     />
                     {!isNotStarted &&
                        turnPlayer?.position === joinedPlayers[3]?.position &&
                        !isGameEnd && (
                           <motion.span
                              layoutId="indicator"
                              transition={{
                                 type: 'spring',
                                 stiffness: 100,
                                 damping: 50,
                              }}
                              className="absolute right-0 top-0 h-4 w-4 rounded-full bg-green-500"
                           />
                        )}
                     <span
                        className={`absolute -bottom-5 left-1/2 line-clamp-1 w-32 -translate-x-1/2 text-center text-sm ${joinedPlayers[3] ? 'text-white/75' : 'text-gray-500'}`}
                     >
                        {joinedPlayers[3]
                           ? joinedPlayers[3].guest_name
                           : 'Empty'}
                     </span>
                  </div>
               </div>
               <div className="flex flex-col items-center">
                  <div className="relative">
                     <AnimatePresence>
                        {playerMessage2 && (
                           <motion.div
                              initial="hidden"
                              animate={'visible'}
                              exit="exit"
                              variants={bubbleVariants}
                              className="absolute bottom-20 right-0 z-[100] w-52 rounded-lg border border-[#3c3c3c] bg-black text-xs font-semibold text-green-400"
                              role="alert"
                           >
                              <div className="relative p-2">
                                 <p className="break-words">
                                    {playerMessage2?.message}
                                 </p>
                                 <span className="absolute right-5 -bottom-2 z-[110] h-4 w-4 rotate-45 border-b border-r border-[#3c3c3c] bg-black"></span>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                     {joinedPlayers[2]?.status === 'winner' && (
                        <>
                           <IconCrown
                              className="absolute -top-6 left-1/2 size-10 -translate-x-1/2 text-orange-400"
                              stroke={1}
                           />
                           <h4 className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-x-[-2px] rounded-full bg-black text-3xl font-bold">
                              #{joinedPlayers[2].rank}
                           </h4>
                        </>
                     )}
                     <IconUserCircle
                        stroke={1}
                        className={`size-20 md:h-20 md:w-20 ${joinedPlayers[2] ? 'text-[#07c6d0]' : 'text-gray-500'}`}
                     />
                     {!isNotStarted &&
                        turnPlayer?.position === joinedPlayers[2]?.position &&
                        !isGameEnd && (
                           <motion.span
                              layoutId="indicator"
                              transition={{
                                 type: 'spring',
                                 stiffness: 100,
                                 damping: 50,
                              }}
                              className="absolute right-0 top-0 h-4 w-4 rounded-full bg-green-500"
                           />
                        )}
                     <span
                        className={`absolute -bottom-5 left-1/2 line-clamp-1 w-32 -translate-x-1/2 text-center text-sm ${joinedPlayers[2] ? 'text-white/75' : 'text-gray-500'}`}
                     >
                        {joinedPlayers[2]
                           ? joinedPlayers[2].guest_name
                           : 'Empty'}
                     </span>
                  </div>
               </div>
            </div>
            <div className="flex items-center justify-between">
               <div className="flex flex-col items-center">
                  <div className="relative">
                     <AnimatePresence>
                        {playerMessage4 && (
                           <motion.div
                              initial="hidden"
                              animate={'visible'}
                              exit="exit"
                              variants={bubbleVariants}
                              className="absolute bottom-20 z-[100] w-52 rounded-lg border border-[#3c3c3c] bg-black text-xs font-semibold text-green-400"
                              role="alert"
                           >
                              <div className="relative p-2">
                                 <p className="break-words">
                                    {playerMessage4?.message}
                                 </p>
                                 <span className="absolute left-5 -bottom-2 z-[110] h-4 w-4 rotate-45 border-b border-r border-[#3c3c3c] bg-black"></span>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                     {joinedPlayers[4]?.status === 'winner' && (
                        <>
                           <IconCrown
                              className="absolute -top-6 left-1/2 size-10 -translate-x-1/2 text-orange-400"
                              stroke={1}
                           />
                           <h4 className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-x-[-2px] rounded-full bg-black text-3xl font-bold">
                              #{joinedPlayers[4].rank}
                           </h4>
                        </>
                     )}
                     <IconUserCircle
                        stroke={1}
                        className={`size-20 md:h-20 md:w-20 ${joinedPlayers[4] ? 'text-[#07c6d0]' : 'text-gray-500'}`}
                     />
                     {!isNotStarted &&
                        turnPlayer?.position === joinedPlayers[4]?.position &&
                        !isGameEnd && (
                           <motion.span
                              layoutId="indicator"
                              transition={{
                                 type: 'spring',
                                 stiffness: 100,
                                 damping: 50,
                              }}
                              className="absolute right-0 top-0 h-4 w-4 rounded-full bg-green-500"
                           />
                        )}
                     <span
                        className={`absolute -bottom-5 left-1/2 line-clamp-1 w-32 -translate-x-1/2 text-center text-sm ${joinedPlayers[4] ? 'text-white/75' : 'text-gray-500'}`}
                     >
                        {joinedPlayers[4]
                           ? joinedPlayers[4].guest_name
                           : 'Empty'}
                     </span>
                  </div>
               </div>
               <div>
                  <h1 className="text-2xl font-semibold xl:text-4xl">
                     {isGameEnd
                        ? 'Game Ended'
                        : game?.game_id
                          ? `ID: ${game?.game_id}`
                          : null}
                  </h1>
               </div>
               <div className="flex flex-col items-center">
                  <div className="relative">
                     <AnimatePresence>
                        {playerMessage1 && (
                           <motion.div
                              initial="hidden"
                              animate={'visible'}
                              exit="exit"
                              variants={bubbleVariants}
                              className="absolute bottom-20 right-0 z-[100] w-52 rounded-lg border border-[#3c3c3c] bg-black text-xs font-semibold text-green-400"
                              role="alert"
                           >
                              <div className="relative p-2">
                                 <p className="break-words">
                                    {playerMessage1?.message}
                                 </p>
                                 <span className="absolute right-5 -bottom-2 z-[110] h-4 w-4 rotate-45 border-b border-r border-[#3c3c3c] bg-black"></span>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                     {joinedPlayers[1]?.status === 'winner' && (
                        <>
                           <IconCrown
                              className="absolute -top-6 left-1/2 size-10 -translate-x-1/2 text-orange-400"
                              stroke={1}
                           />
                           <h4 className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-x-[-2px] rounded-full bg-black text-3xl font-bold">
                              #{joinedPlayers[1].rank}
                           </h4>
                        </>
                     )}
                     <IconUserCircle
                        stroke={1}
                        className={`size-20 md:h-20 md:w-20 ${joinedPlayers[1] ? 'text-[#07c6d0]' : 'text-gray-500'}`}
                     />
                     {!isNotStarted &&
                        turnPlayer?.position === joinedPlayers[1]?.position &&
                        !isGameEnd && (
                           <motion.span
                              layoutId="indicator"
                              transition={{
                                 type: 'spring',
                                 stiffness: 100,
                                 damping: 50,
                              }}
                              className="absolute right-0 top-0 h-4 w-4 rounded-full bg-green-500"
                           />
                        )}
                     <span
                        className={`absolute -bottom-5 left-1/2 line-clamp-1 w-32 -translate-x-1/2 text-center text-sm ${joinedPlayers[1] ? 'text-white/75' : 'text-gray-500'}`}
                     >
                        {joinedPlayers[1]
                           ? joinedPlayers[1].guest_name
                           : 'Empty'}
                     </span>
                  </div>
               </div>
            </div>
            <div>
               <div className="flex justify-center">
                  <div className="relative mb-4 text-center text-xl">
                     {joinedPlayers[0]?.status === 'winner' && (
                        <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 items-center">
                           <span className="text-3xl font-bold">
                              #{joinedPlayers[0].rank}
                           </span>
                           <IconCrown
                              className="size-12 text-orange-400"
                              stroke={1}
                           />
                        </div>
                     )}
                     <h2>{joinedPlayers[0]?.guest_name}</h2>
                     {!isNotStarted &&
                        turnPlayer?.position === joinedPlayers[0]?.position &&
                        !isGameEnd && (
                           <motion.span
                              layoutId="indicator"
                              transition={{
                                 type: 'spring',
                                 stiffness: 100,
                                 damping: 50,
                              }}
                              className="absolute -right-5 top-0 h-4 w-4 rounded-full bg-green-500"
                           />
                        )}
                  </div>
               </div>
               <div className="flex justify-center gap-4">
                  {isNotStarted && (
                     <IconUserCircle
                        stroke={1}
                        className={`size-20 text-[#07c6d0]`}
                     />
                  )}
                  {joinedPlayers[0]?.cards.map((card, i) => {
                     return (
                        <SugarCard
                           player={joinedPlayers[0]}
                           card={card}
                           key={i}
                           index={i}
                           isMyMove={isMyMove}
                           game_id={game_id}
                           isGameEnd={isGameEnd}
                        >
                           {card === 'circle' && (
                              <IconCircle className="size-10" />
                           )}
                           {card === 'triangle' && (
                              <IconTriangle className="size-10" />
                           )}
                           {card === 'star' && <IconStar className="size-10" />}
                           {card === 'umbrella' && (
                              <IconUmbrella className="size-10" />
                           )}
                           {card === 'square' && (
                              <IconSquare className="size-10" />
                           )}
                           {card === 'phantom' && (
                              <IconSkull className="size-10" />
                           )}
                        </SugarCard>
                     )
                  })}
               </div>
            </div>
         </div>
         <GameChatForm game_id={game_id} />
      </>
   )
}

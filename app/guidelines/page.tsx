import BackButton from '@/components/button/back-button'
import {
   IconStar,
   IconSquare,
   IconTriangle,
   IconCircle,
   IconUmbrella,
   IconSkull,
} from '@tabler/icons-react'
import Link from 'next/link'

const GameGuidelines = () => {
   return (
      <div className="h-screen overflow-y-auto py-2 text-gray-200 md:px-20 xl:px-5 xl:py-10">
         <div className="mx-auto max-w-4xl rounded-lg p-2 shadow-lg md:backdrop-blur xl:bg-[#1e1e1e75] xl:p-8">
            <h1 className="mb-6 text-center text-4xl font-bold">
               Game Guidelines
            </h1>
            <p className="mb-4 text-lg leading-relaxed">
               Welcome to the game! This is a multi-player online card game
               where one player is designated as the{' '}
               <span className="font-semibold">Host</span>, and the other
               players are <span className="font-semibold">Normal Players</span>
               .
            </p>

            <div className="mb-4">
               <h2 className="mb-2 text-2xl font-semibold">
                  Host Responsibilities
               </h2>
               <ul className="ml-4 list-inside list-disc">
                  <li>Start the game when all 5 players have joined.</li>
                  <li>Manage the game: start or restart as needed.</li>
               </ul>
            </div>

            <div className="mb-4">
               <h2 className="mb-2 text-2xl font-semibold">
                  Player Distribution
               </h2>
               <p>
                  Once the host starts the game, 20 shuffled cards are
                  distributed randomly among the 5 players, each receiving 4
                  cards. The cards come in 4 sets of similar cards. One random
                  player will receive an extra card called the{' '}
                  <span className="font-semibold">Phantom</span> or{' '}
                  <span className="font-semibold">Joker</span> card.
               </p>
            </div>

            <div className="mb-4">
               <h2 className="mb-2 text-2xl font-semibold">
                  Eligible Cards for Winning
               </h2>
               <div className="mb-4 flex items-center justify-around">
                  <IconStar className="h-10 w-10 text-yellow-400" />
                  <IconSquare className="h-10 w-10 text-blue-400" />
                  <IconTriangle className="h-10 w-10 text-green-400" />
                  <IconCircle className="h-10 w-10 text-red-400" />
                  <IconUmbrella className="h-10 w-10 text-purple-400" />
               </div>
               <p className="text-lg">
                  Players need to collect 4 matching cards from any of these
                  sets to win.
               </p>
            </div>

            <div className="mb-4">
               <h2 className="mb-2 text-2xl font-semibold">Phantom Card</h2>
               <div className="mb-4 flex justify-center">
                  <IconSkull className="h-10 w-10 text-gray-400" />
               </div>
               <p className="text-lg">
                  The player who receives the{' '}
                  <span className="font-semibold">Phantom</span> card will start
                  the game by passing a card. This card cannot be passed on the
                  first move.
               </p>
            </div>

            <div className="mb-4">
               <h2 className="mb-2 text-2xl font-semibold">Gameplay Rules</h2>
               <ul className="ml-4 list-inside list-disc">
                  <li>
                     The player with the Phantom card starts the game by passing
                     a card to the next player.
                  </li>
                  <li>
                     Each player passes one card to the next player on their
                     turn.
                  </li>
                  <li>
                     Players cannot pass a card they have previously received.
                  </li>
                  <li>
                     The first player cannot pass the Phantom card on their
                     first move.
                  </li>
               </ul>
            </div>

            <div className="mb-4">
               <h2 className="mb-2 text-2xl font-semibold">
                  Winning Conditions
               </h2>
               <p>
                  The objective of the game is to collect 4 matching cards. The
                  first player to do so is declared the{' '}
                  <span className="font-semibold">1st position winner</span>,
                  followed by the second and third place winners. The remaining
                  two players lose the game.
               </p>
            </div>

            <div className="mt-8 flex justify-between">
               <Link
                  href={'/'}
                  className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
               >
                  Home
               </Link>
               <BackButton />
            </div>
         </div>
      </div>
   )
}

export default GameGuidelines

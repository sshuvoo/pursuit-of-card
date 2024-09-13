export function playClick() {
   const audio = new Audio('/assets/audio/mouse-click-sound.mp3')
   audio.play()
}

export function playBackgroundMusic() {
   const audio = new Audio('/assets/audio/pink-soldier.mp3')
   audio.play()
}

export function playMove() {
   const audio = new Audio('/assets/audio/card-move.wav')
   audio.play()
}

export function playVictory() {
   const audio = new Audio('/assets/audio/victory-cheer.wav')
   audio.play()
}

export function playShuffleCards() {
   const audio = new Audio('/assets/audio/shuffling-cards.mp3')
   audio.play()
}

export function playGameOver() {
   const audio = new Audio('/assets/audio/game-over.mp3')
   audio.play()
}

export function playMessageNotification() {
   const audio = new Audio('/assets/audio/message-notification.mp3')
   audio.volume = 0.5
   audio.play()
}

export function playJoinPlayer() {
   const audio1 = new Audio('/assets/audio/join1.mp3')
   const audio2 = new Audio('/assets/audio/join2.mp3')
   const audio3 = new Audio('/assets/audio/join3.mp3')
   ;[audio1, audio2, audio3][Math.floor(Math.random() * 3)].play()
}

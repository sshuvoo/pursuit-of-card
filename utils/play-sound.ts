export function playClick() {
   const audio = new Audio('/assets/audio/mouse-click-sound.mp3')
   audio.play()
}

export function playBackgroundMusic() {
   const audio = new Audio('/assets/audio/pink-soldier.mp3')
   audio.play()
}

export function playMove() {
   const audio = new Audio('/assets/audio/card-move.mp3')
   audio.play()
}

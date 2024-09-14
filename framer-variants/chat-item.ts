export const bubbleVariants = {
   hidden: {
      opacity: 0,
      scale: 0.8,
      y: 30,
      transition: {
         type: 'spring',
         stiffness: 200,
         damping: 15,
      },
   },
   visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
         type: 'spring',
         stiffness: 200,
         damping: 20,
         mass: 0.5,
      },
   },
   exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
         type: 'spring',
         stiffness: 150,
         damping: 18,
      },
   },
}

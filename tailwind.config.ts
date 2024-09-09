import type { Config } from 'tailwindcss'

const config: Config = {
   content: [
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         backgroundImage: {
            'squid-game': "url('/assets/image/wallpaper.jpg')",
         },
      },
   },
   plugins: [],
}

export default config

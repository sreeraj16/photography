/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dotpic: {
          black: "#0A0A0A",
          charcoal: "#141414",
          surface: "#1C1C1C",
          surfaceHover: "#242424",
          gold: "#C9A96E",
          goldLight: "#DFBF85",
          goldMuted: "rgba(201, 169, 110, 0.2)",
          goldBorder: "rgba(201, 169, 110, 0.3)",
          white: "#F5F3EE",
          muted: "#A8A39A",
          mutedDark: "#6E6A63",
          border: "#262626"
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      aspectRatio: {
        'cinema': '2.39 / 1',
        'portrait': '4 / 5',
        'reel': '9 / 16',
      },
      animation: {
        'shutter': 'shutter 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        shutter: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.96)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

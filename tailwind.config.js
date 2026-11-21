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
        cream: {
          DEFAULT: "#FAF7F2",
          50: "#FCFBF9",
          100: "#FAF7F2",
          200: "#F4EFE6",
          300: "#EAE2D2",
          muted: "#64748B",
          border: "#E4DCD0",
          card: "#FFFFFF",
          cardHover: "#FDFBF7",
        },
        dotpic: {
          black: "#080C0E",
          charcoal: "#0E1418",
          surface: "#141D22",
          surfaceHover: "#1B272E",
          cream: "#FAF7F2",
          creamCard: "#FFFFFF",
          creamMuted: "#64748B",
          creamBorder: "#E4DCD0",
          teal: "#0D9488",
          tealLight: "#14B8A6",
          tealVibrant: "#2DD4BF",
          tealDeep: "#0F766E",
          gold: "#0D9488",
          goldLight: "#14B8A6",
          goldMuted: "rgba(13, 148, 136, 0.18)",
          goldBorder: "rgba(13, 148, 136, 0.35)",
          white: "#F8FAFC",
          muted: "#94A3B8",
          mutedDark: "#64748B",
          border: "#1E293B"
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
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
        'shimmer': 'shimmer 2.5s infinite linear',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
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
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(201, 169, 110, 0.15)' },
          '100%': { boxShadow: '0 0 30px rgba(201, 169, 110, 0.45)' },
        }
      }
    },
  },
  plugins: [],
}

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
        // Premium white theme (Myntra-inspired)
        primary: '#ff3f6c',       // Myntra pink/coral
        primaryDark: '#e02f5c',
        secondary: '#282c3f',     // Deep navy text
        accent: '#ff3f6c',
        accentGold: '#c89b3c',
        luxuryGold: '#b8860b',
        bgWhite: '#ffffff',
        bgLight: '#f5f5f6',
        bgCream: '#fafafa',
        textDark: '#282c3f',
        textMuted: '#94969f',
        textLight: '#535766',
        borderLight: '#e8e8e1',
        cardBg: '#ffffff',
        // Legacy (kept for gradients)
        neonBlue: '#00f3ff',
        electricPurple: '#8a2be2',
        matteBlack: '#0a0a0a',
        deepCharcoal: '#1a1a1a',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        editorial: ['Cormorant Garamond', 'Times New Roman', 'serif'],
        luxury: ['Italiana', 'serif'],
        fashion: ['Bodoni Moda', 'Didot', 'serif'],
        theater: ['Cinzel', 'Trajan', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #ff3f6c 0%, #ff6f61 50%, #fc5c7d 100%)',
        'luxury-gradient': 'linear-gradient(135deg, #b8860b 0%, #daa520 50%, #c89b3c 100%)',
        'premium-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      boxShadow: {
        'card': '0 1px 4px rgba(40,44,63,0.08)',
        'card-hover': '0 8px 30px rgba(40,44,63,0.12)',
        'soft': '0 2px 12px rgba(0,0,0,0.06)',
        'premium': '0 12px 40px rgba(0,0,0,0.1)',
        'glow-pink': '0 0 20px rgba(255,63,108,0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
        'slide-in-up': 'slideInUp 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255,63,108,0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(255,63,108,0.4)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

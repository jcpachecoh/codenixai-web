/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New brand colors
        'primary-blue': '#01A9FA',
        'primary-purple': '#4E3BE7',
        'primary-pink': '#F81EBD',
        'primary-white': '#ffffff',
        // Legacy colors for backward compatibility
        'accent-blue': '#01A9FA',
        'accent-purple': '#4E3BE7',
        'dark': '#0a0a0a',
        'white': '#ffffff',
        'trust-gray': {
          300: '#d4d4d4',
          400: '#a3a3a3',
          700: '#404040',
        },
      },
      fontFamily: {
        'roboto': ['var(--font-roboto)', 'Roboto', 'system-ui', 'sans-serif'],
        sans: ['var(--font-roboto)', 'Roboto', 'system-ui', 'ui-sans-serif', 'sans-serif']
      },
      fontSize: {
        base: "16px", // Increased from typical 14px
        lg: "18px",   
        xl: "20px"    
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        secondary: '#6b7280',
        accent: '#3b82f6',
        dark: '#1f2937',
        light: '#f9fafb',
      },
      backgroundImage: {
        'gradient-primary': '#ffffff',
        'gradient-accent': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        'gradient-hover': 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'glow': '0 4px 6px rgba(59, 130, 246, 0.1)',
        'glow-lg': '0 10px 15px rgba(59, 130, 246, 0.1)',
      },
    },
  },
  plugins: [],
}

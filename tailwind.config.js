/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Couleurs de la charte graphique AlertZone
      colors: {
        primary: '#1E3A8A',
        alert: '#DC2626',
        amber: '#F59E0B',
        success: '#16A34A',
        violet: '#7C3AED',
        background: '#F8FAFC',
        dark: '#1E293B',
        theft: '#EA580C',
        search: '#991B1B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-red': '#86081A',
        'warm-beige': '#F5F5DC',
        'earthy-green': '#6B8E23',
        'soft-brown': '#D2B48C',
        'gentle-blue': '#B0E0E6',
        'light-gray': '#F0F0F0',
        'dark-olive-green': '#3D3D3D',
        'charcoal-gray': '#4A4A4A',
        'deep-brown': '#4E342E',
        'midnight-blue': '#003366',
        'forest-green': '#2C6B2F',
        customPurple: 'rgb(116,28,100)',
        customGray: 'rgba(208,208,208,1)',
        
      },
      fontFamily: {
        'edu-au': ['Edu AU VIC WA NT Hand', 'sans-serif'],
        'playwrite-at': ['Playwrite AT', 'serif'],
        'playwrite-hr': ['Playwrite HR Lijeva', 'serif'],
      },
    }
  },
  variants: {},
  plugins: [],
}

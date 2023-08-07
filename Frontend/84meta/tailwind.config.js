/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        "0.25":'0.0625rem',
        "0.5":'0.125rem',
        "50%":"50%",
        "100%":"100%",
        "200%":"200%",
        "300%":"300%",
      },
      colors:{
        brandDarkBlue1x:"#1E1E2C",
        brandDarkBlue2x:"#2D2D44BF",
        brandDarkBlue3x:"#06164D",
        brandDarkBlue4x:"#2F404F",
        brandDarkBlue5x:"#2D2D44",
        brandDarkBlue6x:"#06164D33",
        brandWhite1x:"#FDFDFDC9",
        brandWhite2x:"#C7DAD3",
        brandWhite3x:"#FDFDFD",
        brandGold1x:"#F7AA35CC",
        brandGold2x:"#F7AA35",
        brandGreen1x:"#A0AA2D",
        brandGray1x:"#666666",
        brandGray2x:"#bbbbbb",
        brandGray3x:"#767676",
        brandGray4x:"#F9F9F9",
        brandGray5x:"#EFEFEF",
        brandGray6x:"#9E9E9E",
        brandBlue1x:"#043187",
        brandBlue2x:"#cddbf5",
        brandBlue3x:"#064ACB",
      },
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
      },
      borderRadius:{
        10:"10px",
        15:"15px"
      },
      borderWidth:{
        "0.25":'0.0625rem',
        "0.5":'0.125rem',
        "50%":"50%",
        "100%":"100%",
        "200%":"200%",
        "300%":"300%",
      },
      ringWidth:{
        "0.25":'0.0625rem',
        "0.5":'0.125rem',
        "50%":"50%"
      },
      boxShadow: {
        gradientBtn:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        pricingModal:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)",  
        authBtn:"0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",      
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      zIndex:{
        70:"70",
        80:"80"
      }
    }
  },
  plugins: [],
}
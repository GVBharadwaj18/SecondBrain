/** @type {import('tailwindcss').Config} */
export default{
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation:{
        float: "float 6s ease-in-out infinite",
        fadeIn:"fadeIn 1s ease-in-out"
      },
      keyframes:{
        float:{
          "0% ,100%":{transform:"translateY(0px)"},
          "50%":{transform:"translateY(-20px)"},
        },
        fadeIn:{
          from:{opacity:0},
          to:{opacity:1},
        },
      },
         colors:{
            gray: {
          50: "rgba(255, 255, 255, 0.5)",
          100: "#eeeeef",
          200: "#e6e9ed",
          600: "#95989c"
        },
        purple:{
        200:"#e9d5ff",
        500:"#a855f7",
        600:"##7e22ce",
      }

    }
    },
  },
  plugins: [],
}

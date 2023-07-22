import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr"

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
})


// Configuration for using emotion
/*
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      //@ts-ignore
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
});
*/


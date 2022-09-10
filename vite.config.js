import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import fs from "fs"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": path.join(__dirname, "./src/"),
    }
  },
  server: {
    host: true,
    port: 8080,
    https: {
      key: fs.readFileSync("./cert/server.key"),
      cert: fs.readFileSync("./cert/server.crt"),
    }
  }
})

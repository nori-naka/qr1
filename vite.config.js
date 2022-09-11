import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from "path"
import fs from "fs"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: [
        "img/apple-touch-icon.png",
        "favicon.ico",
      ],
      manifest: {
        theme_color: "#37beb0",
        background_color: "#37beb0",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "qrcode1",
        short_name: "qr1",
        description: "QR Code Reader/Generator",
        icons: [
          {
            src: "img/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "img/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "img/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "img/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: 'img/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ]
      }
    })
  ],
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

import { createVuePlugin } from 'vite-plugin-vue2'
import { defineConfig } from "vite"
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// See guide on how to configure Vite at:
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin(),
    Components({
      resolvers: [
        // Vuetify
        VuetifyResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
    },
  },
  server: {
    fs: {
      allow: ["."],
    },
  },
  define: {
  },
})

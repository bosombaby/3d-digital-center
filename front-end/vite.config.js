import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//element-plus按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

//路径问题
import path from 'path'

function resolve( dir ) {
  return path.join( __dirname, dir )
}

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve('src'),
      },
  },
  base:'./'
})

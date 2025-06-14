/*
 * @Author: 刘洋
 * @Date: 2024-11-21 15:16:59
 * @LastEditTime: 2025-02-25 15:33:41
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  //路径别名
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src"
      }
    ]
  },
  server: {
    port: 5174,
  }
})

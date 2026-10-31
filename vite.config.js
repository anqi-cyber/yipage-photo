import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { fileURLToPath } from 'node:url'

// HBuilderX 项目把源码放在根目录，CLI 模式默认读取 src。
// 这里显式指定输入目录，让同一份代码既能用 HBuilderX 运行，也能用 npm 脚本预览。
process.env.UNI_INPUT_DIR = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [uni()],
  server: {
    host: '127.0.0.1',
    port: 5178
  }
})

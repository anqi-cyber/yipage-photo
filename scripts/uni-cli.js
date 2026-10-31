const path = require('node:path')
const { spawnSync } = require('node:child_process')

// uni-app CLI 默认从 ./src 读取源码，而 HBuilderX 项目的源码在根目录。
// 这个包装脚本先指定输入目录，再调用 uni CLI，保证 npm 脚本与 HBuilderX 共用同一份代码。
process.env.UNI_INPUT_DIR = path.resolve(__dirname, '..')

const cli = require.resolve('@dcloudio/vite-plugin-uni/bin/uni.js')
const result = spawnSync(process.execPath, [cli, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: process.env
})

if (result.error) {
  console.error(result.error)
  process.exit(1)
}

process.exit(result.status === null ? 1 : result.status)

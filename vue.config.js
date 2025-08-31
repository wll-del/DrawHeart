const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': path.resolve(__dirname, 'src'), // 确保这行配置正确
  //     },
  //     extensions: ['.js', '.vue', '.json'] // 确保希望自动解析的扩展名在这里
  //     }
  //   }
})

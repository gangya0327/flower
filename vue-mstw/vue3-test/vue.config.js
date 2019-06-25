const blogs = require('./blogs.json')

module.exports = {
  baseUrl: '/', // 跟路径
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录（js html css）
  lintOnSave: false, // 是否开启eslint检测，有效值true||false||error
  devServer: {
    open: true,
    host: 'localhost',
    port: 8040,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://localhost:5001/api/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before(app) {
      app.get('/api/blogs', (req, res) => {
        res.json(blogs)
      })
    }
  }
}

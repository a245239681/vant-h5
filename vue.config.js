module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '广西人社服务'
      return args
    })
  },
}

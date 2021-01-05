module.exports = {
  
  router: {
    linkActiveClass: 'active', // 设置路由激活的样式名
    // 自定义路由表规则
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', 
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: 'login', 
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: 'register', 
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: 'article/:slug', 
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            },
            {
              path: 'settings', 
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: 'editor', 
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: 'editor/:slug', 
              name: 'editorSlug',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: 'profile/:username', 
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: 'profile/:username/favorites', 
              name: 'profileFavorites',
              component: resolve(__dirname, 'pages/profile/')
            },
          ]
        }
      ])
    }
  },
  // 注册插件
  plugins: [
    '~/plugins/dayjs.js',
    '~/plugins/request.js'
  ]
}
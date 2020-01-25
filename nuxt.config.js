const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: '/plugins/fontawesome-free/css/all.min.css' },
      // { rel: 'stylesheet', href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' },
      // { rel: 'stylesheet', href: '/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css' },
      // { rel: 'stylesheet', href: '/plugins/icheck-bootstrap/icheck-bootstrap.min.css' },
      // { rel: 'stylesheet', href: '/plugins/jqvmap/jqvmap.min.css' },
      // { rel: 'stylesheet', href: '/dist/css/adminlte.min.css' },
      // { rel: 'stylesheet', href: '/plugins/overlayScrollbars/css/OverlayScrollbars.min.css' },
      // { rel: 'stylesheet', href: '/plugins/daterangepicker/daterangepicker.css' },
      // { rel: 'stylesheet', href: '/plugins/summernote/summernote-bs4.css' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700' },
      { rel: 'stylesheet', href: '/plugins/fontawesome-free/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' },
      { rel: 'stylesheet', href: '/plugins/overlayScrollbars/css/OverlayScrollbars.min.css' },
      { rel: 'stylesheet', href: '/dist/css/adminlte.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700' },
    ],
    script: [
      // { src: '/plugins/jquery/jquery.min.js' },
      // { src: '/plugins/jquery-ui/jquery-ui.min.js' },
      // { src: '/plugins/bootstrap/js/bootstrap.bundle.min.js' },
      // { src: '/plugins/chart.js/Chart.min.js' },
      // { src: '/plugins/sparklines/sparkline.js' },
      // { src: '/plugins/jqvmap/jquery.vmap.min.js' },
      // { src: '/plugins/jqvmap/maps/jquery.vmap.usa.js' },
      // { src: '/plugins/jquery-knob/jquery.knob.min.js' },
      // { src: '/plugins/moment/moment.min.js' },
      // { src: '/plugins/daterangepicker/daterangepicker.js' },
      // { src: '/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js' },
      // { src: '/plugins/summernote/summernote-bs4.min.js' },
      // { src: '/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js' },
      // { src: '/dist/js/adminlte.js' },
      // { src: '/dist/js/pages/dashboard.js' },
      // { src: '/dist/js/demo.js' },
      { src: '/plugins/jquery/jquery.min.js' },
      { src: '/plugins/bootstrap/js/bootstrap.bundle.min.js' },
      { src: '/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js' },
      { src: '/plugins/inputmask/min/jquery.inputmask.bundle.min.js' },
      { src: '/dist/js/adminlte.min.js' },
      { src: '/dist/js/demo.js' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { 
    continuous: 'true',
    color: 'red',
    height: '4px'
  },

  /*
  ** Global CSS
  */
  css: [
  ],

  router: {
    middleware: [
      'clearValidationErrors',
      'auth',
      'organization'
    ]
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/mixins/validation',
    '@/plugins/mixins/auth',
    '@/plugins/mixins/settings',
    '@/plugins/axios',
    '@/plugins/charts',
    { src: '@/plugins/vue-json-excel', ssr: false },
    { src: "@/plugins/vue2-google-maps.js", ssr: false}
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/login', method: 'post', propertyName: 'token'},
          logout: {url: '/logout', method: 'get'},
          user: {url: '/me', method: 'get', propertyName: 'data'},
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/'
    }
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  */
  // axios: {
  //   baseURL: 'http://localhost:8080/api'
  // },
  axios: {
    // baseURL: 'http://192.168.1.9:8080/api'
    // baseURL: 'http://192.168.1.126:8080/api'
    // baseURL: 'http://aaibuzz.com:8088/api'
    baseURL: 'http://localhost:8080/api'
  },
  

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
  },
}

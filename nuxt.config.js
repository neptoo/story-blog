const axios = require('axios');
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    // title: process.env.npm_package_name || '',
    title: "Storyblock + Nuxt = <3",
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      // { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
      {
        hid: 'description',
        name: 'description',
        content: "An awesome blog bulit with Nuxt and Storyblok in 2020"
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lato:400,700'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.NODE_ENV == 'production' ? '0jBXGdFXj3StG5jxr8JnYwtt' : 'aNOKGr2LLhhAEJqLix5AHwtt',
        cacheProvider: "memory"
      }
    ]
  ],

  generate: {
    routes: function () {
      return axios.get('https://api.storyblok.com/v1/cdn/stories?version=published&token=0jBXGdFXj3StG5jxr8JnYwtt&starts_with=blog&cv=' +
          Math.floor(Date.now() / 1e3))
        .then(res => {
          const blogPosts = res.data.stories.map(bp => bp.full_slug);
          return [
            '/',
            '/blog',
            '/about',
            ...blogPosts
          ]
        });
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}

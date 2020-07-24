// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path')

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/_packages.scss'),
        path.resolve(__dirname, './src/styles/_variables.scss'),
        path.resolve(__dirname, './src/styles/_mixins.scss'),
      ],
    })
}

module.exports = {
  siteName: 'Gradina Ninei',
  plugins: [
    {
      use: 'gridsome-prismic-source',
      options: {
        prismic_url: process.env.PRISMIC_API_URL,
        prismic_token: process.env.AUTH_TOKEN,
        collection_prefix: 'Prismic'
      }
    }
  ],
  chainWebpack(config) {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    config.mode('development')

    types.forEach((type) => {
      addStyleResource(config.module.rule('sass').oneOf(type))
    })

    types.forEach((type) => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  },
  templates: {
    PrismicProduct: [
      {
        path: (node) => {
          return `/products/${node.slug}`
        },
        component: './src/templates/ProductInfo.vue',
      },
    ]
  },
}

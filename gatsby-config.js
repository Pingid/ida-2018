const pixrem = require('pixrem');
const autoprefixer = require('autoprefixer');

const siteData = require('./assets/data/site.json');

const manifestOptions = {
  name: siteData.title,
  short_name: siteData.short_title,
  start_url: siteData.start_url,
  background_color: siteData.background_color,
  theme_color: siteData.theme_color,
  display: siteData.display
}

const faviconOptions = {
  logo: "./src/imgs/icon.png",
  injectHTML: true,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: true,
    twitter: false,
    yandex: false,
    windows: false
  }
}

const analyticsOptions = {
  trackingId: "UA-120787679-1",
  head: true,
  anonymize: true,
}

const rootDir = './';

const offilineOptions = {
  cacheId: `ida2018-cache`
};

module.exports = {
  siteMetadata: {
    title: siteData.title,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-remark-copy-linked-files',
      options: {
        destinationDir: 'src/imgs',
      }
    },
    {
      resolve: `gatsby-plugin-postcss-sass`,
      options: {
        postCssPlugins: [
          pixrem(),
          autoprefixer({
            browsers: ['last 2 versions']
          })
        ],
        precision: 8
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: manifestOptions,
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: faviconOptions
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: analyticsOptions
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: offilineOptions
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/assets`,
      },
    },
          ]
};
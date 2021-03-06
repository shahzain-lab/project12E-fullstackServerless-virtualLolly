/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-graphql",
      options:{
        typeName: 'lollies',
        fieldName: 'Lollies',
        url: 'https://shahzain-virtual-lollies.netlify.app/.netlify/functions/newLolly'
      }
    }
  ],
}

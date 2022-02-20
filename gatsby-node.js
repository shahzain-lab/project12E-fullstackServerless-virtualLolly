const path = require("path");


exports.createPages = async({actions, graphql}) => {
    const {data} = await graphql(`
    query MyQuery{
        allLollies{
            recName
            message
            senderName
            flavorTop
            flavorMiddle
            flavorBottom
            slug
        }
      }
    `)

    console.log(data);
    
    data.allLollies.forEach(lolly => {
        actions.createPage({
            path: `/lollies/${lolly.slug}`,
            component: path.resolve('./src/template/lolly.tsx'),
            context: {
                slug: lolly
            }
        })
    })
}

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions;
  
    // page.matchPath is a special key that’s used for matching pages
  
    // only on the client.
  
    if (page.path.match(/^\/lollies/)) {
      page.matchPath = "/lollies/*";
  
      // Update the page.
  
      createPage(page);
    }
  };
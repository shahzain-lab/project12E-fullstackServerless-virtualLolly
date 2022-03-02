const path = require("path");


exports.createPages = async({actions, graphql}) => {
    const query = await graphql(`
    {
        lollies{
            allLollies{
                slug
            }
        }
      }
    `);

    console.log(query?.data)
    query?.data?.allLollies?.forEach(({slug}) => {
        actions.createPage({
            path: `/lollies/${slug}`,
            component: path.resolve('./src/template/lolly.js'),
            context: {
                slug: slug
            }
        })
    })
}

// exports.onCreatePage = async ({ page, actions }) => {
//     const { createPage } = actions;
  
//     // page.matchPath is a special key that’s used for matching pages
  
//     // only on the client.
  
//     if (page.path.match(/^\/lollies/)) {
//       page.matchPath = "/lollies/*";
  
//       // Update the page.
  
//       createPage(page);
//     }
//   };
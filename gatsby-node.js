

exports.createPages = async({actions, graphql}) => {
    const {data} = await graphql(`
    {
        Lollies{
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
      }
    `);

    console.log("gatsby-node", data)
    data?.Lollies?.allLollies.forEach(({recName, message, senderName, flavorTop, flavorMiddle,flavorBottom, slug}) => {
        actions.createPage({
            path: `/lollies/${slug}`,
            component: require.resolve('./src/templates/lolly.tsx'),
            context: {
                recName,
                message,
                senderName,
                flavorTop,
                flavorMiddle,
                flavorBottom,
                slug
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
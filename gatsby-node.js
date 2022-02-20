const path = require("path");


exports.createPages = async({actions, graphql}) => {
    const {data} = await graphql(`
    query MyQuery{
        allLollies{
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
                slug: lolly.slug
            }
        })
    })
}
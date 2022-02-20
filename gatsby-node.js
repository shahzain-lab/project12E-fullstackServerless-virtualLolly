

exports.createPages = async({actions, graphql}) => {
    const {data} = graphql(`
    query MyQuery{
        allLollies{
          slug
        }
      }
    `)

    console.log(data);
    // data.allLollies.for
}
// import { graphql } from 'gatsby';
import React from 'react'

// export const query = graphql`
// query MyLolly($slug: String!){
//     getLollyBySlug(slug: $slug){
//         recName
//         message
//         senderName
//         flavorTop
//         flavorMiddle
//         flavorBottom
//     }
//   }
// `

const Lolly = ({ pageContext }: any) => {
    return (
        <div>Lolly
            <h1>{pageContext.lolly.recName}</h1>
        </div>
    )
}

export default Lolly;
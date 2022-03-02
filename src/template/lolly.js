// import { graphql } from 'gatsby';
import React from 'react'

// export const query = graphql`
// query MyLolly($slug: String!){
//     Lollies{
//         getLollyBySlug(slug: $slug){
//             recName
//             message
//             senderName
//             flavorTop
//             flavorMiddle
//             flavorBottom
//         }
//     }
//   }
// `;

const Lolly = ({ pageContext }) => {
    return (
        <div>Lolly
            <h1>{pageContext.slug}</h1>
            {/* <h1>{data?.Lollies?.getLollyBySlug.recName}</h1> */}
        </div>
    )
}

export default Lolly;
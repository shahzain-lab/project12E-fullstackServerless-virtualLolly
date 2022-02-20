import { graphql } from 'gatsby';
import React from 'react'

export const query = graphql`
query MyQuery($slug: String!){
    getLollyBySlug(slug: $slug){
        recName
        message
        senderName
        flavorTop
        flavorMiddle
        flavorBottom
    }
  }
`

const Lolly = ({ data }: any) => {
    return (
        <div>Lolly
            <h1>{data.getLollyBySlug.recName}</h1>
        </div>
    )
}

export default Lolly;
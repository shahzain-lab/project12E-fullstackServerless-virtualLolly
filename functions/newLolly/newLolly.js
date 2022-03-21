const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb');
const axios = require("axios")

const q= faunadb.query;

const typeDefs = gql`
  type Lolly{
    recName: String
    message: String
    senderName: String
    flavorTop: String!
    flavorMiddle: String!
    flavorBottom: String!
    slug: String
  }

  type Query {
    allLollies: [Lolly]!
    getLollyBySlug(slug: String!): Lolly

  }

  type Mutation{
    createLolly(
    recName: String!
    message: String!
    senderName: String!
    flavorTop: String!
    flavorMiddle: String!
    flavorBottom: String!
    slug: String!
    ): Lolly
  }
`;

const client = new faunadb.Client({
  secret: "fnAEfsaQJBACSYp1GtC7UVfSqtdx8PGgg2FnXh_Z"
})

const resolvers = {
  Query: {
    allLollies: async() => {
      try{
        const results = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index('all_lollies'))),
            q.Lambda((x) => q.Get(x))
          )
        )

        const result = results.data.map(lolly => {
          return{
            recName: lolly.data.recName,
            message: lolly.data.message,
            senderName: lolly.data.senderName,
            flavorTop: lolly.data.flavorTop,
            flavorMiddle: lolly.data.flavorMiddle,
            flavorBottom: lolly.data.flavorBottom,
            slug: lolly.data.slug,
          }

        })
        return result
      }catch(err){
        return err.toString()
      }
    },
  },
  Mutation: {
    createLolly: async(_, args) => {
      try{
        const results = await client.query(
          q.Create(q.Collection('Lollies'),{
            data: args
          })
        )
        axios.post("https://api.netlify.com/build_hooks/621239a8132c87ae19a52a2d")
        .then(res => console.log(res))
        .catch(err => console.log(err))

        return results.data
      }catch(err){
        return err.toString()
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }

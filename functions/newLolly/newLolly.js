const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb');
const q= faunadb.query;

const typeDefs = gql`
  type Lolly{
    recName: String!
    message: String!
    senderName: String!
    flavorTop: String!
    flavorMiddle: String!
    flavorBottom: String!
    slug: String!
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
    getLollyBySlug: async({_, args}) => {
      try{
        const results = await client.query(
          q.Get(q.Match(q.Index("lollies_by_slug"), args.slug))
        )
        return results.data
      }catch(err) {
        return err.toString()
      }
    }
  },
  Mutation: {
    createLolly: async(_, args) => {
      try{
        const results = await client.query(
          q.Create(q.Collection('Lollies'),{
            data: args
          })
        )

        

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

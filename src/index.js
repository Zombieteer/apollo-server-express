
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { success, error } from 'consola'
import { PORT, IN_PROD } from './config'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'

// Initialise express applications
const app = express()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: IN_PROD,
    context: {}
})

const startApp = () => {
    try {
        server.applyMiddleware({ app })
        app.listen(PORT, () => success({
            message: `Server started in PORT ${PORT}`,
            badge: true
        }))
    } catch (error) {
        error({
            message: `Server didn't started`,
            badge: true
        })
    }
}

startApp()
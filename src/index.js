
import express from 'express'
import mongoose from 'mongoose'
import { ApolloServer, gql } from 'apollo-server-express'
import { success, error } from 'consola'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'

import {
    PORT,
    IN_PROD,
    DB
} from './config'

import * as AppModels from './models'

// Initialise express applications
const app = express()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: IN_PROD,
    context: {...AppModels}
})

const startApp = async () => {
    try {
        // connect to database
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        success({
            message: `Successfully connected with the database`,
            badge: true
        });

        // inject apollo server middle ware to express app
        server.applyMiddleware({ app })
        app.listen(PORT, () => success({
            message: `Server started in PORT ${PORT}`,
            badge: true
        }))
    } catch (error) {
        error({
            message: error.message,
            badge: true
        })
    }
}

startApp()
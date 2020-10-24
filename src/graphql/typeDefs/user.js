import { gql } from 'apollo-server-express'

export default gql`
    extend type Query{
        infoUserResolver : String!
    }

    extend type Mutation{
        registerUser(newUser: UserInput!) : AuthResp!
    }

    input UserInput{
        avatarImage: String
        firstName: String!
        lastName: String!
        username: String!
        password: String!
        email: String!
    }

    type User {
        avatarImage: String
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        id: ID!
    }

    type AuthResp {
        user: User!,
        token: String!
    }
`;
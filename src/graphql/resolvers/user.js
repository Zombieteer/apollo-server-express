import { ApolloError } from "apollo-server-express"
import { hash } from 'bcryptjs'
import { issueToken, serializeUser } from '../../functions'

export default {
    Query: {
        infoUserResolver: () => {
            return "Hello from user resolver"
        }
    },
    Mutation: {
        registerUser: async (_, args, context, info) => {
            let { newUser } = args
            let { User } = context

            try {
                let { username, email } = newUser

                // first check if user exist
                let user = await User.findOne({ username })
                if (user) {
                    throw new Error('Username is already taken.')
                }
                // If the email taken
                user = await User.findOne({ email })
                if (user) {
                    throw new Error('Email is already taken.')
                }

                // Create new user interface
                user = new User(newUser);
                // Hash the password
                user.password = await hash(newUser.password, 10)
                // save the user to the database
                let result = await user.save();
                result = result.toObject()
                result.id = result._id
                result = serializeUser(result)

                // issue the authentication token
                let token = await issueToken(result)
                return {
                    token,
                    user: result
                }
            } catch (err) {
                throw new ApolloError(err.message, 400)
            }
        }
    }
}
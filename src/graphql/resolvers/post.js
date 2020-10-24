export default {
    Query: {
        getAllPosts: async (_, { }, context, info) => {
            let { Post } = context
            let res = await Post.find()
            return res
        },
        getPostById: async (_, args, context, info) => {
            let {id} = args
            let { Post } = context
            let res =await Post.findById(id)
            return res
        }
    },

    Mutation: {
        createNewPost: async (_, args, context, info) => {
            let { newPost } = args
            let { Post } = context
            let res = await Post.create(newPost)
            return res
        },
        editPosyById: async (_, args, context, info) => {
            let { updatedPost, id } = args
            let { Post } = context
            let editedPost = await Post.findByIdAndUpdate(id, { ...updatedPost }, { new: true })
            return editedPost
        },
        deletePostById: async (_, args, context, info) => {
            let { id } = args
            let { Post } = context
            try {
                await Post.findByIdAndDelete(id)
                return {
                    id: id,
                    message: "Post successfully deleted",
                    success: true
                }
            } catch (error) {
                return {
                    id: id,
                    message: error.message,
                    success: false
                }
            }
        }
    }
}
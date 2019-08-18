const contentful = require('contentful')

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
    path: `.env.${activeEnv}`,
})

if (process.env.CONTENTFUL_ACCESS_TOKEN && process.env.CONTENTFUL_SPACE_ID) {
    console.log(".env data read")
} else {
    console.error(".env data read not read!")
}


// Create Contentful Client
const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

// Give client to Models to access
const BlogPostModel = require('./backend/blogPost.model')
const blogPostModel = new BlogPostModel(client)

const ChallengeModel = require('./backend/challenge.model')
const challengeModel = new ChallengeModel(client)


exports.createPages = async ({ actions: { createPage } }) => {

    const allChallenges = await challengeModel.getAllChallenges()
            .catch(e => console.log(e))

    createPage({
        path: `/challenges`,
        component: require.resolve("./src/templates/challenges.js"),
        context: { allChallenges },
    })

    allChallenges.forEach(challenge => {
        createPage({
            path: `/challenge/${challenge.slug}/`,
            component: require.resolve("./src/templates/challenge.js"),
            context: { ...challenge },
        })
    })

    const allBlogPosts = await blogPostModel.getAllBlogPosts()
            .catch(e => console.log(e))

    createPage({
        path: `/blog`,
        component: require.resolve("./src/templates/blog.js"),
        context: { allBlogPosts },
    })

    allBlogPosts.forEach(post => {
        createPage({
            path: `/blog/${post.slug}/`,
            component: require.resolve("./src/templates/post.js"),
            context: { ...post },
        })
    })
}

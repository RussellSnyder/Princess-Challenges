const axios = require("axios");

const baseURL = process.env.API_ENDPOINT;

exports.createPages = async ({ actions: { createPage } }) => {
    const allChallenges = await axios.get(`${baseURL}challenges`)
            .then(response => {
                console.log(JSON.parse(response.data))
                return response
            })
            .then(response => JSON.parse(response.data))
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

    const allBlogPosts = await axios.get(`${baseURL}blog`)
            .then(response => JSON.parse(response.data))
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

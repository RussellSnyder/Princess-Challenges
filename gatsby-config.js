let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
    path: `.env.${activeEnv}`,
})

module.exports = {
    siteMetadata: {
        title: "Irini's Challenges",
        apiUrl: process.env.API_URL,
    },
    plugins: [`gatsby-plugin-less`]
}

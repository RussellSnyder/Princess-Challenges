let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
    path: `.env.${activeEnv}`,
})

module.exports = {
    plugins: [`gatsby-plugin-less`]
}

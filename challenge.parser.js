const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const slugify = require('slugify');

const { parseBlogPost } = require('./blogPost.parser')
const { parseImage } = require('./contentful.parser')

function parseChallngeBingoSpaces(spaces) {
    const parsedSpaces = spaces.map(space => {
        let { task, repetitions, category } = space.fields
        return {
            task,
            repetitions,
            category: category.fields.name
        }
    })

    // TODO replace once enough spaces are input
    // for now gotta design this board!
    return [...parsedSpaces, ...parsedSpaces, ...parsedSpaces, ...parsedSpaces, ...parsedSpaces]
}

function parseChallengeBingo(challengeBingo) {
    let {title, numberOfSpaces, bingoChallengeSpaces} = challengeBingo.fields

    return {
        title,
        numberOfSpaces,
        bingoChallengeSpaces: parseChallngeBingoSpaces(bingoChallengeSpaces)
    }
}

function parseChallenge(challenge) {
    let {
        title,
        description,
        pinterestHeader,
        pinterestFooter,
        pinterestLink,
        featuredImage, // fetch more data later
        challengeBingo, // fetch more data later
        relevantBlogPosts, // fetch more data later
    } = challenge.fields

    return {
        title,
        slug: slugify(title, {
            lower: true
        }),
        description: documentToHtmlString(description),
        featuredImage: parseImage(featuredImage),
        challengeBingo: parseChallengeBingo(challengeBingo),
        relevantBlogPosts: relevantBlogPosts.map(parseBlogPost),
        pinterestHeader,
        pinterestLink,
        pinterestFooter
    }
}

module.exports = { parseChallenge }

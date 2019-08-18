const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const slugify = require('slugify');

const { parseBlogPost } = require('./blogPost.parser')
const { parseImage } = require('./contentful.parser')

function parseChallngeBingoSpaces(spaces) {
    const parsedSpaces = spaces.map(space => {
        let { id } = space.sys
        let { task, repetitions, category, challengeAssigned } = space.fields
        return {
            id,
            task,
            repetitions,
            category: category.fields.name,
            challengeAssigned: challengeAssigned ? challengeAssigned.map(challenge => challenge.title) : []
        }
    })

    return [...parsedSpaces]
}

function parseChallngeBingoSpacesTemplate(bingoChallengeGridTemplate) {
    const { name, template } = bingoChallengeGridTemplate.fields;
    return {
        name,
        categories: template.categories
    }
}

function parseChallengeBingo(challengeBingo) {
    if (!challengeBingo) {
        return
    }

    let {title, numberOfSpaces, bingoChallengeGridTemplate, taskCollection} = challengeBingo.fields

    return {
        title,
        numberOfSpaces,
        bingoChallengeGridTemplate: parseChallngeBingoSpacesTemplate(bingoChallengeGridTemplate),
        taskCollection: parseChallngeBingoSpaces(taskCollection)
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

    let { id } = challenge.sys

    return {
        id,
        title,
        slug: slugify(title, {
            lower: true
        }),
        description: documentToHtmlString(description),
        featuredImage: parseImage(featuredImage),
        challengeBingo: parseChallengeBingo(challengeBingo),
        relevantBlogPosts: relevantBlogPosts ? relevantBlogPosts.map(parseBlogPost) : null,
        pinterestHeader,
        pinterestLink,
        pinterestFooter
    }
}

module.exports = { parseChallenge }

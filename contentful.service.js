const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const util = require('util');

const CONTENT_TYPES = {
    BLOG_POST: "blogPost",
    CHALLENGE: "challenge",
    CHALLENGE_BINGO_GRID: "challengeBingoGrid",
    CHALLENGE_BINGO_SPACE: "challengeBingoSpace",
    CHALLENGE_SPACE_CATEGORIES: "challengeSpaceCategories",
    TAG: "tag"
}

function parseBlogPost(post) {
    let {title, short, long, tags} = post.fields;

    let renderedLong = documentToHtmlString(long);

    let tagNames = [1,2,3];
    if (tags) {
        tagNames = tags.map(tag => tag.fields.name)
    }

    return {
        title,
        short,
        long: renderedLong,
        tags: tagNames
    }
}

function getAllBlogPosts(client) {
    return client.getEntries({
        include: 10,
        content_type: CONTENT_TYPES.BLOG_POST
    })
    .then(function (entries) {
        return entries.items.map(function (entry) {
            return parseBlogPost(entry)
        })
    })
    .catch(e => console.log(e))
};

module.exports = {
    getAllBlogPosts
}

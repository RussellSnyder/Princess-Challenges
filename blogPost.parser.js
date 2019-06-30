const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const slugify = require('slugify');

function parseBlogPost(post) {
    let {title, short, long, tags} = post.fields

    let renderedLong = documentToHtmlString(long);

    let tagNames = [];

    if (tags) {
        tagNames = tags.map(tag => tag.fields.name)
    }

    return {
        title,
        slug: slugify(title, {
            lower: true
        }),
        short,
        long: renderedLong,
        tags: tagNames
    }
}

module.exports = { parseBlogPost }

const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const slugify = require('slugify');

function parseBlogPost(post) {
    if (!post) {
        return
    }

    let {title, short, long, tags, featured} = post.fields

    let renderedLong = documentToHtmlString(long);

    let tagNames = [];

    if (tags) {
        tagNames = tags.map(tag => tag.fields.name)
    }

    return {
        title,
        featured,
        slug: slugify(title, {
            lower: true
        }),
        short,
        long: renderedLong,
        tags: tagNames
    }
}

module.exports = { parseBlogPost }

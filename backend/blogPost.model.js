'use strict';
const {CONTENT_TYPES} = require("./contentful.service")
const {parseBlogPost} = require('./blogPost.parser')

module.exports = class BlogPostModel {
    constructor(client) {
        this.client = client;
    }

    getBlogPostBySlug(slug) {
        return this.getAllBlogPosts()
                .then(posts => posts.find(post => post.slug === slug))
                .catch(e => console.log(e))
    }

    getAllBlogPosts() {
        return this.client.getEntries({
            content_type: CONTENT_TYPES.BLOG_POST
        })
                .then(function (entries) {
                    return entries.items.map(function (entry, i) {
                        return parseBlogPost(entry)
                    })
                })
                .catch(e => console.log(e))
    };
}

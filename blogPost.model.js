'use strict';
const { CONTENT_TYPES } = require("./contentful.service")
const { Cache } = require('./cache.service')
const { parseBlogPost } = require('./blogPost.parser')


const ttl = 0 // 60 * 60 * 1; // cache for 1 Hour
const cache = new Cache(ttl); // Create a new cache service instance

module.exports = class BlogPostModel {
    constructor(client) {
        this.client = client;
    }

    getBlogPostBySlug(slug) {
         const key = `getBlogPostBySlug_${slug}`

        return this.getAllBlogPosts()
                .then(posts => posts.find(post => post.slug === slug))
                .catch(e => console.log(`${key}: ${e}`))
        // return cache.get(key, () => this.getAllBlogPosts())
        //         .then(posts => posts.find(post => post.slug === slug))
        //         .catch(e => console.log(`${key}: ${e}`))
    }

    getAllBlogPosts() {
        const key = `getAllBlogPosts`

        return this.client.getEntries({
            content_type: CONTENT_TYPES.BLOG_POST
        })
        // return cache.get(key, () => this.client.getEntries({
        //     content_type: CONTENT_TYPES.BLOG_POST
        // }))
                .then(function (entries) {
                    return entries.items.map(function (entry) {
                        return parseBlogPost(entry)
                    })
                })
                .catch(e => console.log(e))
    };
}

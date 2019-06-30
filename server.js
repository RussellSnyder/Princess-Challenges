'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const contentful = require('contentful')

let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

const env = require("dotenv").config({
    path: `.env.${activeEnv}`,
})

console.log(`---------${process.env.CONTENTFUL_ACCESS_TOKEN}----------`)
console.log(`---------${process.env.CONTENTFUL_SPACE_ID}----------`)

const BlogPostModel = require('./blogPost.model')
const ChallengeModel = require('./challenge.model')

////////////////////////
/// Contentful Stuff ///
////////////////////////
const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

const blogPostModel = new BlogPostModel(client)
const challengeModel = new ChallengeModel(client)

////////////////////////
//// Express Stuff /////
////////////////////////
const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.get('/', (req, res) => {
    challengeModel.getAllChallenges()
            .then(challenges => {
                        res.setHeader('Cache-Control', 'no-cache');
                        res.json(JSON.stringify(challenges));
                    }
            )
});

app.get('/blog', (req, res) => {
    blogPostModel.getAllBlogPosts()
            .then(posts => {
                        res.setHeader('Cache-Control', 'no-cache');
                        res.json(JSON.stringify(posts));
                    }
            )
});

app.get('/blog/:slug', (req, res) => {
    const { slug } = req.params;
    blogPostModel.getBlogPostBySlug(slug)
            .then(post => {
                        res.setHeader('Cache-Control', 'no-cache');
                        res.json(JSON.stringify(post));
                    }
            ).catch(e => `no post for slug ${slug}: ${e}`)
});


app.get('/challenges', (req, res) => {
    challengeModel.getAllChallenges()
            .then(posts => {
                        res.setHeader('Cache-Control', 'no-cache');
                        res.json(JSON.stringify(posts));
                    }
            )
});


app.get('/challenges/:slug', (req, res) => {
    const { slug } = req.params;
    challengeModel.getChallengeBySlug(slug)
            .then(post => {
                        res.setHeader('Cache-Control', 'no-cache');
                        res.json(JSON.stringify(post));
                    }
            ).catch(e => `no post for slug ${slug}: ${e}`)
});


app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

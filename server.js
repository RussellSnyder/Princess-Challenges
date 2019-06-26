'use strict'
const env = require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const contentful = require('contentful')

const { getAllBlogPosts } = require('./contentful.service.js')

////////////////////////
/// Contentful Stuff ///
////////////////////////
const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})


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
    getAllBlogPosts(client)
            .then(posts => {
                        res.setHeader('Cache-Control', 'no-cache');
                        res.json(JSON.stringify(posts));
                    }
            )
});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

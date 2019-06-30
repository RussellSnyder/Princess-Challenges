'use strict';
const util = require('util')


const {CONTENT_TYPES} = require("./contentful.service")
const {Cache} = require('./cache.service')
const {parseChallenge} = require('./challenge.parser')

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new Cache(ttl); // Create a new cache service instance

module.exports = class ChallengeModel {
    constructor(client) {
        this.client = client;
    }

    getAllChallenges() {
        const key = `all_challenges`

        const {client} = this;

        return cache.get(key, () => this.client.getEntries({
            content_type: CONTENT_TYPES.CHALLENGE,
            include: 10
        }))
                .then(function (entries) {
                    return client.parseEntries(entries)
                })
                .then(function (entries) {
                    return entries.items.map(function (entry) {
                        return parseChallenge(entry)
                    })
                })
                .then(challenges => {
                    // console.log(util.inspect(challenges, {showHidden: false, depth: null}))
                    return challenges
                })
                .catch(e => console.log(e))
    };

    getChallengeBySlug(slug) {
        const key = `challenge_${slug}`

        return cache.get(key, () => this.getAllChallenges())
                .then(challenges => challenges.find(challenge => challenge.slug === slug))
                .catch(e => console.log(`${key}: ${e}`))
    }

}

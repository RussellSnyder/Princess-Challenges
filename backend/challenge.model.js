'use strict';
const {CONTENT_TYPES} = require("./contentful.service")
const {parseChallenge} = require('./challenge.parser')

module.exports = class ChallengeModel {
    constructor(client) {
        this.client = client;
    }

    getAllChallenges() {
        const {client} = this;

        return client.getEntries({
            content_type: CONTENT_TYPES.CHALLENGE,
            include: 10
        })
                .then(function (entries) {
                    return client.parseEntries(entries)
                })
                .then(function (entries) {
                    return entries.items.map(function (entry) {
                        return parseChallenge(entry)
                    })
                })
                // .then(challenges => {
                //     return challenges
                // })
                .catch(e => console.log(e))
    };

}

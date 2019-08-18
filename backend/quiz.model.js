'use strict';
const {CONTENT_TYPES} = require("./contentful.service")
const {parseQuiz} = require('./quiz.parser')

module.exports = class ChallengeModel {
    constructor(client) {
        this.client = client;
    }

    getAllQuizzes() {
        const {client} = this;

        return client.getEntries({
            content_type: CONTENT_TYPES.QUIZ,
            include: 10
        })
                .then(function (entries) {
                    return client.parseEntries(entries)
                })
                .then(function (entries) {
                    return entries.items.map(function (entry) {
                        return parseQuiz(entry)
                    })
                })
                .catch(e => console.log(e))
    };

}

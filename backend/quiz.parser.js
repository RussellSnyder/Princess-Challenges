const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const slugify = require('slugify');

const { parseImage } = require('./contentful.parser')

function parseAnswer(answer) {
    const {
        textAnswer,
        photoAnswer,
        challenges,
        points,
        furtherQuestion
    } = answer.fields;
    return {
        textAnswer: textAnswer,
        photoAnswer: parseImage(photoAnswer),
        challenges: challenges.map((challenge, i) => {
            return {
                id: challenge.sys.id,
                points: points[i]
            }
        }),
        furtherQuestion: parseQuestion(furtherQuestion)
    }
}

function parseQuestion(rawQuestion) {
    if (!rawQuestion) {
        return
    }

    const {question, answers} = rawQuestion.fields

    const { id } = rawQuestion.sys

    return {
        id,
        question,
        answers: answers.map(parseAnswer)
    }
}

function parseQuiz(quiz) {
    let {
        title,
        featured,
        description,
        questions // fetch more data later
    } = quiz.fields

    return {
        title,
        featured,
        slug: slugify(title, {
            lower: true
        }),
        description: documentToHtmlString(description),
        questions: questions.map(parseQuestion),
    }
}

module.exports = { parseQuiz }

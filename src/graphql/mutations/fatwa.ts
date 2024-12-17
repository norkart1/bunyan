import { gql } from '@apollo/client'

export const CREATE_FATWA = gql`
    mutation CreateFatwa($createFatwaInput: CreateFatwaInput!) {
        createFatwa(createFatwaInput: $createFatwaInput) {
            answer
            answeredAt
            answeredBy {
                id
                username
            }
            answeredById
            askedAt
            createdAt
            id
            question
            questionerMobile
            status
        }
    }
`

export const ANSWER_FATWA = gql`
    mutation AnswerFatwa($answer: String!, $answerFatwaId: Int!) {
        answerFatwa(answer: $answer, id: $answerFatwaId) {
            answer
            answeredAt
            answeredBy {
                id
                username
            }
            answeredById
            askedAt
            createdAt
            id
            question
            questionerMobile
            status
        }
    }
`

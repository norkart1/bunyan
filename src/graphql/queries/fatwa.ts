import { gql } from "@apollo/client";

export const FIND_ALL_FATWAS = gql`
query Fatwas($filters: JSON, $limit: Int, $offset: Int, $orderBy: JSON, $relationsToFilter: JSON) {
  fatwas(filters: $filters, limit: $limit, offset: $offset, orderBy: $orderBy, relationsToFilter: $relationsToFilter) {
    id
    question
    questionerMobile
    status
    createdAt
    askedAt
    answeredById
    answeredBy {
      id
      username
    }
    answeredAt
    answer
  }
}
`;

export const FIND_FATWA_BY_ID = gql`
query Fatwa($fatwaId: Int!) {
  fatwa(id: $fatwaId) {
    answer
    answeredAt
    answeredBy {
      username
      id
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
`;

export const COUNT_FATWAS = gql`
query countFatwas($filters: JSON, $relationsToFilter: JSON) {
  countFatwas(filters: $filters, relationsToFilter: $relationsToFilter)
}
`;
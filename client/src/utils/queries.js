import gql from 'graphql-tag';

export const QUERY_ME = gql`
 {
    dashboard {
      _id
      username
      email
      bookCount
      savedBooks {
        # _id
        bookId
        authors
        image
        link
        title
        description
    }
      }
    }

`;

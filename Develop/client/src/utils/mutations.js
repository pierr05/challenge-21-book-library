import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`; 

export const ADD_USER = gql `
  mutation addUser($userName: String!, $email: String!, $password: String!) {
    addUser(
        userName: $userName
        email: $email
        password: $password
    ) {
        token 
        user {
            _id
        }
    }
  }
`;

export const SAVE_BOOK = gql `
  mutation saveBook($authors: [String], $description: String!, $title: String!, $_bookId: String!, $image: String!, $link: String!) {
    saveBook(
        authors: [String]
        description: $description
        title: $title
        _bookId: $_bookId
        image: $image
        link: $link
    ) {
        token
            user {
            _id
        }
    }
  }
`;

export const REMOVE_BOOK = gql `
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        token 
        user {
            _id
        }
    }
  }
`;

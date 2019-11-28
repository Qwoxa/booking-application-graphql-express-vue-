import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation createUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      email
      _id
    }
  }
`;

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent($eventInput: EventInput!) {
    createEvent(eventInput: $eventInput) {
      _id
      title
      description
      price
      date
      creator {
        _id
        email
      }
    }
  }
`;

export const GET_LOCAL_USER = gql`
  query getLocalUser {
    localUser @client {
      isLoggedIn
    }
  }
`;

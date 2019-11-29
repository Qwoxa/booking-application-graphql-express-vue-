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

export const GET_ALL_EVENTS = gql`
  query getAllEvents {
    events {
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
      userId
    }
  }
`;

export const LOCAL_LOGIN = gql`
  mutation localLogin($userId: ID!) {
    localLogin(userId: $userId) @client {
      isLoggedIn
    }
  }
`;

export const LOCAL_LOGOUT = gql`
  mutation localLogout {
    localLogout @client {
      isLoggedIn
    }
  }
`;

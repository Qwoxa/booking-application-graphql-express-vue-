const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

const _store = ['Romantic Cooking', 'Sailing', 'All Night Cooking'];

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
    type RootQuery {
      events: [String!]!
    }

    type RootMutation {
      createEvent(name: String!): [String]
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
    rootValue: {
      events: () => {
        return _store;
      },
      createEvent: ({ name }) => {
        _store.push(name);
        return _store;
      },
    },
    graphiql: true,
  })
);

app.listen(3000);

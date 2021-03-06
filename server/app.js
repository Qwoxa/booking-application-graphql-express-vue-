const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const graphqlSchema = require('./graphql/schemas');
const graphqlResolvers = require('./graphql/resolvers');
const mongoose = require('mongoose');
const { config } = require('dotenv');
const isAuth = require('./middleware/is-auth');
const cors = require('cors');

config();

// Connect DB
(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/event_booking', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info('DB connected');
  } catch (error) {
    console.error('Error connecting the DB', error);
  }
})();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

app.listen(3000);

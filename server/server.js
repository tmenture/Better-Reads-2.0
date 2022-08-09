const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

// creates the new apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
})

// integrates apollo server with express application as middleware
server.applyMiddleware( { app } );

app.use(express.urlencoded( { extended: true } ));
app.use(express.json());

// serves the client/build as static assets 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    // console logs the port the server is running on
    console.log(`API server running on port ${PORT}!`);
    // shows dev here they can test the queries
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

  });
});

// error handling 
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
import React, { Fragment } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/NavBar';
import DonatePage from './components/DonatePage';

const httpLink = createHttpLink({
  uri: '/graphql',
});


// const link = createHttpLink({
//   useGETForQueries: true,
//   uri: "/graphql",
// });

// const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("id");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// export const client = new ApolloClient({
//   link: authLink.concat(link),
//   cache,
// });



const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Navbar />
          <Switch>
            <Fragment>
              <Route 
                exact path="/" 
                component={SearchBooks} 
              />
              <Route 
                exact path='/saved' 
                component={SavedBooks} 
              />
              { <Route 
                path="/donate" 
                component={DonatePage} 
              /> }
          </Fragment>
              <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>

          <Footer />
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
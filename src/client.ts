import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: process.env.REACT_APP_API_URL,
  fetch: (...args) => fetch(...args),
});

export default new ApolloClient({ cache, link });

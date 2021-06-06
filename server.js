require('dotenv').config();
const {ApolloServer, gql} = require("apollo-server-express"); 
const express = require("express");
const http = require("http");
const app = express();

const PORT = process.env.PORT || 4000;

const urlAPI = require("./datasources/urls");

const typeDefs = gql`
type Query {
  shortenURL(url: String!): String
  shortenedURLs(searchText: String): [ShortenedURL]
}
type Mutation {
  deleteURL(id: ID!): ShortenedURL
}
type ShortenedURL {
  id: ID
  originalUrl: String
  shortenedId: String 
  clickCount: Int
  lastVisited: String
  createdAt: String
}
`

const resolvers = require("./resolvers");

const dataSources = () => ({
  urlAPI: new urlAPI()
})

const server = new ApolloServer({
  typeDefs, 
  resolvers, 
  dataSources,
  introspection: true,
  playground: true, 
})

server.applyMiddleware({app})

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

(async() => {
  await new Promise(resolve => httpServer.listen(process.env.PORT, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`);
  return { server, app, httpServer };
})()


app.get("/", (req, res) => {
  res.status(200).json({message: "Welcome to the Url Shortener API - buycoins interview challenge", remoteGraphqlAPI: "https://bcurlshrt.herokuapp.com/graphql", localGraphQLAPI: "http://localhost:4000/graphql"})
})

const handleShortenedURL = require('./urlController');

app.get("/:id", handleShortenedURL)



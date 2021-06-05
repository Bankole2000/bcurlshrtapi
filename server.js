require('dotenv').config();
const {ApolloServer, gql} = require("apollo-server-express"); 
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

const urlAPI = require("./datasources/urls");

const typeDefs = gql`
type Query {
  shortenURL(url: String!): String
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

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
})

app.get("/", (req, res) => {
  res.status(200).json({message: "Welcome to the Url Shortener API - buycoins interview challenge", remoteGraphqlAPI: "https://bcurlshrt.herokuapp.com/graphql", localGraphQLAPI: "http://localhost:4000"})
})

const handleShortenedURL = require('./urlController');

app.get("/:id", handleShortenedURL)



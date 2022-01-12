import express from "express";
import { ApolloServer } from "apollo-server-express";
import { PubSub } from 'graphql-subscriptions';
/* 'graphql-import' is deprecated, use 'graphql-tools' instead */
// import { importSchema } from "graphql-import";
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
// import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import "dotenv-defaults/config.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import db from "./src/db.js";
import Query from "./src/resolvers/Query.js";
import Mutation from "./src/resolvers/Mutation.js";
import Subscription from "./src/resolvers/Subscription.js";
// import User from './src/resolvers/User.js';
import Comment from './src/resolvers/Comment.js';
import Reply from './src/resolvers/Reply.js';
import mongo from "./src/mongo.js";
import dotenv from 'dotenv-defaults'
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 80;

const schema = loadSchemaSync(path.join(__dirname, 'src', 'schema.graphql'), { loaders: [new GraphQLFileLoader()] })
const pubsub = new PubSub();
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

const server = new ApolloServer({
  schema,
  resolvers: {
    Query,
    Mutation,
    Subscription,
    // User, 
    Comment, 
    Reply,
  },
  context: {
    db,
    pubsub,
  },
  introspection: true,
  playground: true,
});

await server.start();
server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

mongo.connect();

httpServer.listen(port, () => {
  console.log(`🚀 Server Ready at ${port}! 🚀`);
  console.log(`Graphql Port at ${port}${server.subscriptionsPath}`);
}); 
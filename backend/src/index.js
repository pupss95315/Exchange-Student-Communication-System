import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db.js';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import Subscription from './resolvers/Subscription.js';
import User from './resolvers/User.js';
import Comment from './resolvers/Comment.js';
import Reply from './resolvers/Reply.js';
import mongo from './mongo.js'
import dotenv from 'dotenv-defaults'
dotenv.config();

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Comment,
    Reply,
  },
  context: {
    db,
    pubsub,
  },
});

mongo.connect();

// console.log("DB connected. ");

server.start({ port: process.env.PORT | 80 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 80}!`);
});
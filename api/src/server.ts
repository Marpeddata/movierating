import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import mongoose from "mongoose";
import express from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import cors from "cors";
import http from "http";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/mutation";
import typeDefs from "./schema";


// interface MyContext {
//   movies: typeof MovieModel;
//   reviews: typeof ReviewModel;
//   genres: typeof GenreModel;
// }

const DB = process.env.DB_CONNECTION_STRING!;

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log("DB connection failed!"));

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server)
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4001 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4001/graphql`);

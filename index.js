import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'

//types
import { typeDefs } from './schema';

//server setup 
const server = new ApolloServer({
  typeDefs
  // resol vers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`The server is running at ${url}`);
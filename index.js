import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'

//types
import { typeDefs } from './schema.js';
import _db from './_db.js';

const resolvers = {
    Query:{
        reviews:()=>{
            return _db.reviews
        },
        review:(_,args)=>{
            return _db.reviews.find((review)=> review.id === args.id)
        },
        games:()=>{
            return _db.games;
        },
        game:(_,args)=>{
            return _db.games.find((review)=>review.id === args.id)
        },
        authors:()=>{
            return _db.authors;
        },
        author:(_,args)=>{
            return _db.authors.find((author)=>author.id === args.id)
        }
    }
}

//server setup 
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`The server is running at ${url}`);
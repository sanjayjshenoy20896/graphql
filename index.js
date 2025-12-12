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
    },
    Game:{
        reviews:(parent)=>{
            return _db.reviews.filter((review)=> review.game_id === parent.id)
        }
    },
    Review:{
        author:(parent)=>{
            return _db.authors.filter((author)=> author.id === parent.id)
        },
        game:(parent)=>{
            return _db.games.filter((game)=>game.id === parent.id)
        }
    },
    Author:{
        reviews:(parent)=>{
            return _db.reviews.filter((review)=> review.author_id === parent.id)
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
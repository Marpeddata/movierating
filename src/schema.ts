const typeDefs = `#graphql

    type Movie {
        id: ID!
        title: String!
        year: Int!
        director: String!
        description: String!
        actors: [String!]!
        genre: Genre!
        reviews: [Review]
    }

    type Review {
        id: ID!
        rating: Int!
        date: String!
        text: String!
        movie: Movie!
    }

    type Genre {
         id: ID!
         type: String!
         movies: [Movie]
    }
    
    
type Query {
    movies: [Movie!]!
    genres: [Genre!]!
    reviews: [Review!]!

    movie(id: ID!): Movie
    review(id: ID!): Review
    genre(id: ID!): Genre
    }



    
type Mutation {
    createMovie(title: String!, year: Int!, director: String!, description: String!, actors: [String!]!, genre: ID!): Movie
    createReview(id: ID!, rating: Int!, date: String!, text: String!, movie: ID!): Review
    deleteMovie(id: ID!): Boolean
}
`;

export default typeDefs;

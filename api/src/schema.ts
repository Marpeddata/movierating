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
        user: User!
    }

    type Genre {
         id: ID!
         type: String!
         movies: [Movie]
    }

    type User {
        id: ID!
        username: String!
        password: String!
        role: String
        reviews: [Review]
    }
    
    
type Query {
    movies: [Movie!]!
    genres: [Genre!]!
    reviews: [Review!]!

    movie(id: ID!): Movie
    review(id: ID!): Review
    genre(id: ID!): Genre

    users: [User!]!
    user(id: ID!): User

    }



    
type Mutation {
    createMovie(title: String!, year: Int!, director: String!, description: String!, actors: [String!]!, genre: ID!): Movie
    createReview(id: ID!, rating: Int!, date: String!, text: String!, movie: ID!): Review
    deleteMovie(id: ID!): Boolean
    createUser(username: String!, password: String!): User
}
`;

export default typeDefs;

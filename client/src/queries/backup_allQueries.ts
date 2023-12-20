import { gql } from "@apollo/client";

// const GET_USERS = gql`
// query GET_ALL_USERS{
//   users {
//     id
//     name
//     email
//     address {
//       street
//       city
//     }
//   }
// }
// `;

// const GET_USER = gql`
// query GET_USER_BY_ID($id:Int){
//   user(id:$id) {
//     id
//     name
//     email
//     address {
//       street
//       city
//     }
//   }
//   }
// `;

// const ADD_USER = gql`
// mutation ADD_USER($name: String!, $email: String){
//     addUser(name: $name, email: $email) {
//       id
//       name
//     }
//   }
// `;

const GET_ALL_MOVIES = gql`
  query Movies {
    movies {
      id
      title
      year
      director
      description
      actors
      genre {
        id
        type
      }
      reviews {
        id
        rating
        date
        text
        user {
          id
          username
        }
      }
    }
  }
`;

const GET_MOVIE_BY_ID = gql`
  query Movie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      year
      director
      description
      actors
      genre {
        id
        type
      }
      reviews {
        id
        rating
        text
        date
      }
    }
  }
`;

const GET_ALL_GENRES = gql`
  query Genres {
    genres {
      id
      type
      movies {
        id
        title
      }
    }
  }
`;

const ADD_MOVIE = gql`
  mutation CreateMovie(
    $title: String!
    $year: Int!
    $director: String!
    $description: String!
    $actors: [String!]!
    $genre: ID!
  ) {
    createMovie(
      title: $title
      year: $year
      director: $director
      description: $description
      actors: $actors
      genre: $genre
    ) {
      id
      title
    }
  }
`;

const GET_REVIEW_BY_USER_ID = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      username
      password
      role
      reviews {
        id
        rating
        date
        text
        movie {
          id
          title
          year
          director
          description
          actors
          genre {
            type
          }
        }
      }
    }
  }
`;

const SEND_REQUEST = gql`
  mutation CreateRequest(
    $title: String!
    $year: Int!
    $director: String!
    $comment: String!
    $username: String!
  ) {
    createRequest(
      title: $title
      year: $year
      director: $director
      comment: $comment
      username: $username
    ) {
      id
      title
      year
      director
      comment
      username
    }
  }
`;

const GET_ALL_REQUESTS = gql`
  query Requests {
    requests {
      title
      year
      director
      comment
      username
    }
  }
`;

export {
  GET_ALL_MOVIES,
  GET_MOVIE_BY_ID,
  GET_ALL_GENRES,
  ADD_MOVIE,
  GET_REVIEW_BY_USER_ID,
  SEND_REQUEST,
  GET_ALL_REQUESTS,
};

// export { GET_USERS, GET_USER, ADD_USER };

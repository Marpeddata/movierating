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
const ADD_USER = gql`
mutation CreateUser($username: String, $password: String) {
  createUser(username: $username, password: $password) {
    id
    username
    role
    token
  }
}
`;



const LOGIN_USER = gql`
mutation loginUser($username: String, $password: String) {
  loginUser(username: $username, password: $password) {
    id
    username
    role
    token
  }
}
`;
const GET_ALL_MOVIES = gql`
  query Movies {
    movies {
      id
      url
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
      url
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
        user {
          id
          username
        }
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
    $url: String!
    $title: String!
    $year: Int!
    $director: String!
    $description: String!
    $actors: [String!]!
    $genre: ID!
  ) {
    createMovie(
      url: $url
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
          url
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

const ADD_REVIEW = gql`
mutation CreateReview($rating: Int!, $date: String!, $text: String!, $movie: ID!, $user: ID!) {
  createReview(rating: $rating, date: $date, text: $text, movie: $movie, user: $user) {
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
        id
        type
      }
    }
    user {
      id
      username
    }
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
  ADD_REVIEW,
  ADD_USER,
  LOGIN_USER
};

// export { GET_USERS, GET_USER, ADD_USER };

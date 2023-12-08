import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_MOVIES,
  ADD_MOVIE,
  GET_ALL_GENRES,
} from "./queries/allQueries";
import "./styles/App.css";
import { Row, Col, Button, Form, Dropdown } from "react-bootstrap";

type Movie = {
  id?: string;
  title: string;
  year: number;
  director: string;
  description: string;
  actors: string[];
  genre: string;
  reviews?: string[];
};

type Genre = {
  id: string;
  type: string;
};

function App() {
  const { loading, error, data } = useQuery(GET_ALL_MOVIES);

  const [movieObj, setMovieObj] = useState<Movie>({
    title: "",
    year: 2000,
    director: "",
    description: "",
    actors: [],
    genre: "",
  });

  const [addMovie, addMovieResponse] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_ALL_MOVIES }],
  });

  //get all genres
  const [genre, setGenre] = useState<Genre[]>([]);
  const [chosenGenre, setChosenGenre] = useState<Genre["type"]>("");

  const genreQuery = useQuery(GET_ALL_GENRES, {
    onCompleted: (data) => {
      setGenre(data.genres);
    },
  });

  return (
    <>
      <Row>
        <Col>
          <h1>Movie Rating</h1>

          <ul>
            {data?.movies.map((movie: Movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </Col>

        <Col>
          <h2>Add Movie</h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addMovie({
                variables: {
                  title: movieObj.title,
                  year: movieObj.year,
                  director: movieObj.director,
                  description: movieObj.description,
                  actors: movieObj.actors,
                  genre: movieObj.genre,
                },
              });
            }}
          >
            <br />
            <input
              type="text"
              name="title"
              placeholder="title"
              value={movieObj.title}
              onChange={(evt) => {
                setMovieObj({ ...movieObj, title: evt.target.value });
              }}
            />
            <br />
            <input
              type="number"
              name="year"
              placeholder="year"
              value={movieObj.year}
              onChange={(evt) => {
                setMovieObj({ ...movieObj, year: parseInt(evt.target.value) });
              }}
            />
            <br />
            <input
              type="text"
              name="director"
              placeholder="director"
              value={movieObj.director}
              onChange={(evt) => {
                setMovieObj({ ...movieObj, director: evt.target.value });
              }}
            />
            <br />
            <input
              type="text"
              name="description"
              placeholder="description"
              value={movieObj.description}
              onChange={(evt) => {
                setMovieObj({ ...movieObj, description: evt.target.value });
              }}
            />
            <br />
            <input
              type="text"
              name="actors"
              placeholder="actors"
              value={movieObj.actors}
              onChange={(evt) => {
                movieObj.actors.push(evt.target.value);
                setMovieObj({ ...movieObj, actors: movieObj.actors });
              }}
            />
            <br />
            <input
              type="text"
              name="genre"
              placeholder="genre"
              value={movieObj.genre}
              onChange={(evt) => {
                setMovieObj({ ...movieObj, genre: evt.target.value });
              }}
            />

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {chosenGenre ? chosenGenre : "Select Genre"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {genre.map((genre: Genre) => (
                  <Dropdown.Item
                    onClick={() => setChosenGenre(genre.type)}
                    key={genre.id}
                  >
                    {genre.type}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <br />
            <br />
            <Button type="submit">Add Movie</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default App;

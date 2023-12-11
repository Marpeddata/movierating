import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_MOVIES,
  ADD_MOVIE,
  GET_ALL_GENRES,
} from "../queries/allQueries";
import "../styles/App.css";
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

function Home() {
  const { loading, error, data } = useQuery(GET_ALL_MOVIES);

  const [movieObj, setMovieObj] = useState<Movie>({
    title: "",
    year: NaN,
    director: "",
    description: "",
    actors: [],
    genre: "",
  });

  const [addMovie, addMovieResponse] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_ALL_MOVIES }],
  });

  function handleAddMovie() {
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
    setMovieObj({
      title: "",
    year: 2000,
    director: "",
    description: "",
    actors: [],
    genre: "",
    });
  }


  //get all genres
  const [genre, setGenre] = useState<Genre[]>([]);
  const [chosenGenre, setChosenGenre] = useState<Genre["type"]>("");

  const genreQuery = useQuery(GET_ALL_GENRES, {
    onCompleted: (data) => {
      setGenre(data.genres);
    },
  });

  //actors
  const [chosenActor, setChosenActor] = useState<string>("");


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
                  const target = evt.target;
                  const value = target.value;
                  const name = target.name;
                  setMovieObj({ ...movieObj, [name]: value });
              }}

            />
            {/* <Button onClick={() => {
               movieObj.actors.push(chosenActor);
               setMovieObj({ ...movieObj, actors: movieObj.actors });}}
              >Add Actor</Button> */}

            <br />


            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" value={movieObj.genre}>
                {chosenGenre ? chosenGenre : "Select Genre"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {genre.map((genre: Genre) => (
                  <Dropdown.Item
                  onClick={() => {
                    setChosenGenre(genre.type)
                    setMovieObj({ ...movieObj, genre: genre.id })}}
                  key={genre.id}
                >
                  {genre.type} {genre.id}
                </Dropdown.Item>
                
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <br />
            <br />
            <Button type="submit" onClick={handleAddMovie}>Add Movie</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Home;

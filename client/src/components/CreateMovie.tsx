import { Form, Button, Dropdown, Container } from "react-bootstrap";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_MOVIES,
  ADD_MOVIE,
  GET_ALL_GENRES,
} from "../queries/allQueries";
import { Movie, Genre } from "../types";

const CreateMovie = () => {
  //get all genres
  const [genre, setGenre] = useState<Genre[]>([]);
  const [chosenGenre, setChosenGenre] = useState<Genre["type"]>("");
  const [showAlert, setShowAlert] = useState(false);

  const genreQuery = useQuery(GET_ALL_GENRES, {
    onCompleted: (data) => {
      setGenre(data.genres);
    },
  });

  //actors
  const [chosenActor, setChosenActor] = useState<string>("");

  function handleAddMovie() {
    addMovie({
      variables: {
        url: movieObj.url,
        title: movieObj.title,
        year: movieObj.year,
        director: movieObj.director,
        description: movieObj.description,
        actors: movieObj.actors,
        genre: movieObj.genre,
      },
    });
    setMovieObj({
      url: "",
      title: "",
      year: NaN,
      director: "",
      description: "",
      actors: [],
      genre: "",
    });
    setShowAlert(true);
  }

  const [movieObj, setMovieObj] = useState<Movie>({
    url: "",
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

  return (
    <div>
      <Container className=" shadow min-vh-100 py-2 pt-4">
        <p className="display-6 mb-5"> Add movie </p>
        <div className="container mt-3">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <div className="card px-5 py-5" id="form1">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addMovie({
                      variables: {
                        url: movieObj.url,
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
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="url"
                      placeholder="url"
                      value={movieObj.url}
                      onChange={(evt) => {
                        setMovieObj({ ...movieObj, url: evt.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="title"
                      value={movieObj.title}
                      onChange={(evt) => {
                        setMovieObj({ ...movieObj, title: evt.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="number"
                      name="year"
                      min={1900}
                      placeholder="year"
                      value={movieObj.year}
                      onChange={(evt) => {
                        setMovieObj({
                          ...movieObj,
                          year: parseInt(evt.target.value),
                        });
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="director"
                      placeholder="director"
                      value={movieObj.director}
                      onChange={(evt) => {
                        setMovieObj({
                          ...movieObj,
                          director: evt.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="description"
                      placeholder="description"
                      value={movieObj.description}
                      onChange={(evt) => {
                        setMovieObj({
                          ...movieObj,
                          description: evt.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
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
                  </Form.Group>
                  <Dropdown className="text-start ">
                    <Dropdown.Toggle
                      variant="secondary"
                      id="dropdown-basic"
                      value={movieObj.genre}
                    >
                      {chosenGenre ? chosenGenre : "Select Genre"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {genre.map((genre: Genre) => (
                        <Dropdown.Item
                          onClick={() => {
                            setChosenGenre(genre.type);
                            setMovieObj({ ...movieObj, genre: genre.id });
                          }}
                          key={genre.id}
                        >
                          {genre.type}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="text-end">
                    <Button
                      value="log-in"
                      className="btn btn-md greenBg whiteTekst mx-1"
                      type="submit"
                      onClick={handleAddMovie}
                    >
                      Add movie
                    </Button>
                    {showAlert ? (
                <div className="alert alert-success mt-4 text-center" role="alert">
                  This movie has been added!
                </div>
              ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateMovie;

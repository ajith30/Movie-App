import { useEffect, useState } from "react";
import { Movie } from "./Movie";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function MovieList() {
  const [moviesList, setMoviesList] = useState([]);

  //useEffect - Fetch the movies once
  useEffect(() =>{
    fetchMovies();
  }, []);

  //Fetching movies from MockAPI 
  const fetchMovies = () => {
    fetch(`https://645fc9ecfe8d6fb29e263406.mockapi.io/movies`)
    .then((response) => {
      return response.json();
    })
    .then((movies) => {
      setMoviesList(movies);
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
  }

  const deleteMovie = (id) => {
    fetch(`https://645fc9ecfe8d6fb29e263406.mockapi.io/movies/${id}`, {method: "DELETE"})
    .then(() => {
      fetchMovies();
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
  }

  return (
    <div className="movie-list">
      {moviesList.map((movie) => {
        return <Movie key={movie.id} movie={movie} id={movie.id} 
          deleteButton={
            <IconButton  onClick={() => {deleteMovie(movie.id)}} aria-label="delete" color="error"> 
              <DeleteIcon fontSize="small" />
            </IconButton>
          }
        />
      })}
      </div>
    );
  }

  export {MovieList}
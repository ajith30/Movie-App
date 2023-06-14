import { React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useParams, useNavigate } from "react-router-dom";

export function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState({});
  //useEffect() - Fetching meovie once with respective id once.
  useEffect(() =>{
    fetch(`https://645fc9ecfe8d6fb29e263406.mockapi.io/movies/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((movie) => {
        setMovie(movie);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [id]);


  //const movie = moviesList[id];
  const navigate = useNavigate();
  


  /* Conditional Styling */
  const styles = { color: (movie.rating >= 8) ? "green" : "red" };
  return (
    <div>
      <iframe
        width="100%"
        height="550"
        src={movie.trailer}
        title={movie.name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div className="movie-detail-container">
        <div className="movie-spec">
          <h2 className="movie-name">{movie.name}</h2>
          <p style={styles} className="movie-rating">
            ⭐ {movie.rating}
          </p>
        </div>
        <p className="movie-summary">{movie.summary}</p>
        <Button 
          onClick={() => {
            navigate(-1);
          }}
          startIcon={<KeyboardBackspaceIcon />}
          variant="contained"
        >
          Back
        </Button>
      </div>
    </div>
  );
}

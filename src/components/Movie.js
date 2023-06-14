import React from 'react';
import { useState } from "react";
import { Counter } from "./Counter";
import { Card, CardActions, CardContent, CardMedia, IconButton } from "@mui/material";
import { ExpandLess, ExpandMore, Info } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

function Movie({movie, id, deleteButton}) {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  /* Conditional Styling */
  const styles = { color: (movie.rating >= 8) ? "green" : "red" };

  return(
    <Card className="movie-container" >
      <CardMedia image={movie.poster} className="movie-poster" />
      <CardContent>
        <div className="movie-spec">
          <h2 className="movie-name">
            {movie.name}

            <IconButton onClick={() => {setShow(!show)}}>
              {(show) ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <IconButton
              onClick={() => {navigate(`/movies/${id}`)}}
              color="primary"
            >
              <Info />
            </IconButton>
          </h2>
          <div className="movie-rating">
            <p>⭐ </p> 
            <p style={styles} >{movie.rating}</p>
          </div>
        </div>
        {(show) ? <p>{movie.summary}</p> : null}
      </CardContent>
      <CardActions sx={{alignItems: "baseline", justifyContent: "space-between"}} >
        <Counter />
        <div>
        {deleteButton}
        <IconButton color="secondary" onClick={() => {navigate(`/movies/edit/${movie.id}`)}} aria-label="Add" size="small">
          <EditIcon fontSize="inherit" />
        </IconButton>
        </div>
      </CardActions>
    </Card>
  )
}

export {Movie};
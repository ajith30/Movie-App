import { React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const movieValidationSchema = Yup.object({
  name: Yup.string()
    .required("Why not fill this name? 😊"),
  poster: Yup.string()
    .required("Why not fill this poster? 😊")
    .min(4, "Need a bigger poster 🙂"),
  rating: Yup.number()
    .required("Why not fill this rating? 😊")
    .min(0)
    .max(10, "Rating must be less than or equal to 10"),
  summary: Yup.string()
    .required("Why not fill this summary? 😊")
    .min(20, "Need a bigger summary 🙂"),
  trailer: Yup.string()
    .required("Why not fill this trailer? 😊")
    .min(4, "Need a bigger summary 🙂"),
});

export function EditMovie() {
  const {id} = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: movie.name || "",
      poster: movie.poster || "",
      rating: movie.rating || "",
      summary: movie.summary || "",
      trailer: movie.trailer || "",
    },
    validationSchema: movieValidationSchema,
    onSubmit: (values) => {
      const embed = values.trailer.split("/").pop();
      values.trailer = "https://www.youtube.com/embed/" + embed;
      updateMovie(id, values);
    },
  });

  const updateMovie = (id, updateMovie) => {
    fetch(`https://645fc9ecfe8d6fb29e263406.mockapi.io/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateMovie)
    })
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
  }

  return (
    <div className="movie-form">
      {/* { console.log(formik.values)} */}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ width: 500, mb: 2 }}
          name="name"
          label="Name"
          variant="filled"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.name && formik.errors.name) ? true : false}
          helperText={(formik.touched.name && formik.errors.name) ? formik.errors.name : null}
        />
        <br />

        <TextField
          sx={{ width: 500, mb: 2 }}
          name="poster"
          label="Poster"
          variant="filled"
          value={formik.values.poster}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.poster && formik.errors.poster) ? true : false}
          helperText={(formik.touched.poster && formik.errors.poster) ? formik.errors.poster : null}
        />
        <br />

        <TextField
          sx={{ width: 500, mb: 2 }}
          name="rating"
          label="Rating"
          variant="filled"
          value={formik.values.rating}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.rating && formik.errors.rating) ? true: false}
          helperText={(formik.touched.rating && formik.errors.rating) ? formik.errors.rating : null}
        />
        <br />

        <TextField
          sx={{ width: 500, mb: 2 }}
          name="summary"
          label="Summary"
          variant="filled"
          value={formik.values.summary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.summary && formik.errors.summary) ? true: false}
          helperText={(formik.touched.summary && formik.errors.summary) ? formik.errors.summary : null}
        />

        <br />

        <TextField
          sx={{ width: 500, mb: 2 }}
          name="trailer"
          label="Trailer"
          variant="filled"
          value={formik.values.trailer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.trailer && formik.errors.trailer) ? true: false}
          helperText={(formik.touched.trailer && formik.errors.trailer) ? formik.errors.trailer : null}
        />
        <br />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button type="submit" variant="outlined" sx={{ mb: 3 }}>
            UPDATE Movie
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default EditMovie;
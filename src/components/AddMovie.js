import { React } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
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

export function AddMovie() {
  const formik = useFormik({
    initialValues: {
      name: "",
      poster: "",
      rating: "",
      summary: "",
      trailer: "",
    },
    validationSchema: movieValidationSchema,
    onSubmit: (values) => {
      const embed = values.trailer.split("/").pop();
      values.trailer = "https://www.youtube.com/embed/" + embed;
      addMovie(values);
    }
  });

  const navigate = useNavigate();
  const addMovie = (newMovie) => {
    fetch(`https://645fc9ecfe8d6fb29e263406.mockapi.io/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMovie)
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
            ADD Movie
          </Button>
        </Box>
      </form>
    </div>
  );
}

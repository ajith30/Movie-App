import  { React, useState } from 'react';
import './App.css';
import { MovieList } from "./components/MovieList";

import Button from '@mui/material/Button';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { MovieDetails } from "./components/MovieDetails";
import { NotFound } from "./components/NotFound";

import { AddMovie } from "./components/AddMovie";
import EditMovie from "./components/EditMovie";


function App() {

  const navigate = useNavigate();

  const [mode, setMode] = useState("dark");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={3} sx={{minHeight: "100vh", borderRadius: "0"}}>
        <div className="App">
          <AppBar position="sticky" sx={{mb: 2}} >
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
              <div>
              <Button color="inherit" onClick={() => {navigate("/")}}>Home</Button>
              <Button color="inherit" onClick={() => {navigate("/")}}>Movies</Button>
              <Button color="inherit" onClick={() => {navigate("/movies/add")}}>Add Movies</Button>
              </div>
              <div>
              <Button color="inherit" onClick={() => {setMode((mode === "light") ? "dark": "light")}}
              startIcon={(mode === 'dark') ? <Brightness7Icon /> : <Brightness4Icon /> }
              >
              {(mode === "light") ? "dark": "light"} mode
              </Button>
              </div>
            </Toolbar>
          </AppBar>
          
          <Routes>
              
              {/* Redirecting path from films to movies to show movies list. 
              If the path name required change but both old and new path name has to work, then we can use <Navigate> for redirection. */}
              <Route path="/films" element={<Navigate replace to="/" />}></Route>
              <Route path="/" element={<MovieList />}></Route>
             
              <Route path="/movies/add" element={<AddMovie />}></Route>
              <Route path="/movies/edit/:id" element={<EditMovie />}></Route>
              <Route path="/movies/:id" element={<MovieDetails />}></Route>
              <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;



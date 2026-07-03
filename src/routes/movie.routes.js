import { Router } from "express";
import { 
    createMovie, 
    deleteMovie, 
    getAllMovies, 
    getMovieById, 
    updateMovie 
} from "../controllers/movie.controllers.js";

export const movieRouter = Router();

// Revisá que esta línea esté idéntica:
movieRouter.post("/movies", createMovie); 

movieRouter.get("/movies", getAllMovies);
movieRouter.get("/movies/:id", getMovieById);
movieRouter.put("/movies/:id", updateMovie);
movieRouter.delete("/movies/:id", deleteMovie);
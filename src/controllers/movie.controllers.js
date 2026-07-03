import {Movie} from "../models/movie.model.js";

export const getAllMovies = async (req, res) => {
    try {
        const getAllMovies = await Movie.findAll();
        return res.status(200).json(movies);
    } catch (error){
        console.log(error);
        return res.status(500).json({messaje: "Error interno del servidor"});
    };
};

export const getMovieById = async (req,res) => {
    try{
        const { id } = req.params;
        const movie = await Movie.findByPk(id);

        if (!movie){
            return res.status(404).json({message: "La película requerida no existe"});
        }
        return res.status(200).json(movie);
    }catch (error){
        {console.log(error);
            return res.status(500).json ({message: "Error interno del servidor"});
            
        }
    }
};

export const createMovie = async (req, res) => {
    try {
        const { title, genre, duration, year, synopsis } = req.body;

        if (!title || !genre || !duration || !year) {
            return res.status(400).json({ message: "Los campos title, genre, duration y year son obligatorios" });
        }

        if (!Number.isInteger(duration) || duration <= 0) {
            return res.status(400).json({ message: "La duración debe ser un número entero válido mayor a cero" });
        }

        if (!Number.isInteger(year) || year < 1888 || year > 2026) {
            return res.status(400).json({ message: "El año debe ser un número entero de 4 dígitos entre 1888 y 2026" });
        }

        if (synopsis && typeof synopsis !== "string") {
            return res.status(400).json({ message: "La sinopsis debe ser una cadena de texto" });
        }

        const existingMovie = await Movie.findOne({ where: { title } });
        if (existingMovie) {
            return res.status(400).json({ message: "Ya existe una película registrada con ese título" });
        }

        const newMovie = await Movie.create({ title, genre, duration, year, synopsis });
        return res.status(201).json({ message: "Película creada correctamente", newMovie });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, genre, duration, year, synopsis } = req.body;

        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: "La película requerida no existe" });
        }
        
        if (!title || !genre || !duration || !year) {
            return res.status(400).json({ message: "Los campos title, genre, duration y year no pueden estar vacíos" });
        }

        
        if (!Number.isInteger(duration) || duration <= 0) {
            return res.status(400).json({ message: "La duración debe ser un número entero válido mayor a cero" });
        }

        
        if (!Number.isInteger(year) || year < 1888 || year > 2026) {
            return res.status(400).json({ message: "El año debe ser un número entero válido entre 1888 y 2026" });
        }

    
        if (synopsis && typeof synopsis !== "string") {
            return res.status(400).json({ message: "La sinopsis debe ser una cadena de texto" });
        }

       
        if (title !== movie.title) {
            const existingMovie = await Movie.findOne({ where: { title } });
            if (existingMovie) {
                return res.status(400).json({ message: "Ya existe otra película registrada con ese título" });
            }
        }

       
        await movie.update({ title, genre, duration, year, synopsis });
        return res.status(200).json({ message: "Película actualizada correctamente", movie });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

       
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: "La película requerida no existe" });
        }

        await movie.destroy();
        return res.status(200).json({ message: "Película eliminada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
import { Sequelize } from "sequelize";

// Inicializamos la constante limpiamente
export const sequelize = new Sequelize('movies', 'root', '', {
  host: "localhost",
  dialect: "mysql",
});

// Función para testear la conexión e inicializar
export const startDB = async () => {
    try {
        await sequelize.authenticate();
        // Usamos force: false para cuidar tus datos
        await sequelize.sync({ force: false });
        console.log('Conexion a la db esta lista');
    } catch (error) {
        console.error('No se pudo conectar a la db:', error);
    }
};
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { type } from "node:os";
import { timeStamp } from "node:console";

export const Movie = sequelize.define (
    'Movie',
    {
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        genre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        duration:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        year:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        synopsis:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    },
    {
    timestamps: false,
    createdAt: false,
    updatedAt: false
    },
);
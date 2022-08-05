import "reflect-metadata"
import { DataSource } from "typeorm"
import { Comment } from "./entity/Comment.entity"
require("dotenv").config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Comment],
    migrations: [],
    subscribers: [],

    "ssl": { "rejectUnauthorized": false }

})

AppDataSource.initialize()
    .then(() => {
        console.log("DB connected.....")
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))
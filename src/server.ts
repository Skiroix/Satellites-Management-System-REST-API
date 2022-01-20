import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import users from "./routes/users";
import satellites from "./routes/satellites";

const server = express();

const URI = process.env.MONGODB_URI as string;
mongoose.connect(URI);

server.use(express.json());
server.use(cors());

server.use("/users", users);
server.use("/satellites", satellites);

server.listen(process.env.PORT, () =>
	console.log(`Server listening at post ${process.env.PORT}...`)
);

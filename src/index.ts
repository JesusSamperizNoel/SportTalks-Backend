import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

const app = express()
const port = process.env.PORT
app.use(express.json())
const allowedOrigins = ["*"]
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options))

//Routers:
import { routerUser } from "./users/infrastructure/rest/usuarios.router";

app.use("/user", routerUser); 
app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});
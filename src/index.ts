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
import { routerUser } from "./users/infrastructure/rest/user.router";
import { routerGroup } from "./group/infraestructure/rest/group.router";
import { routerMessage } from "./message/infraestructure/rest/message.router";
//Router implementation:
app.use("/user", routerUser)
app.use("/group", routerGroup)
app.use("/message", routerMessage)

//Port configuration and message check ok:
app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`)
});

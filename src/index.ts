import express from "express";
import Routes from "./routes";

const app = express();
const routes = new Routes();

app.use(express.json());
app.use(express.urlencoded());
routes.users(app);

app.get("/", (req, res) => res.json("SERVER IS RUNNING"));

app.listen(3333, () => console.log("SERVER IS RUNNING"));

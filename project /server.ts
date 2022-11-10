import express from "express";
import { print } from "listening-on";
// import path from "path";
// import { SessionMiddleware } from "/session";
import { userRoutes } from "./router/users";
// import { isRedirect } from "node-fetch";
import { landing } from "./router/landing";
import { bookingroute } from "./router/select_room";

let app = express();

app.use(express.urlencoded());

app.use(express.json());

// app.use(SessionMiddleware);

app.use(express.static("public"));

app.use(userRoutes);
app.use(landing);
app.use(bookingroute);

let port = 8030;
app.listen(port, () => {
  print(port);
});

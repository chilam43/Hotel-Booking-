import express from "express";
import expressSession from "express-session";
import { print } from "listening-on";
// import path from "path";
// import { SessionMiddleware } from "/session";
import { userRoutes } from "./router/usersRouter";
// import { isRedirect } from "node-fetch";
import { bookingroute } from "./router/select_room";
import { landing } from "./router/landingRouter";
import { client } from "./db";

client.connect();
let app = express();

app.use(
  expressSession({
    secret: "hotel-secret",
    resave: true,
    saveUninitialized: true,
  })
);

type User = {
  id: number;
  name: string;
  title: string;
};

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}
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

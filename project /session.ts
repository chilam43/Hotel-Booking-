import expressSession from "express-session";

declare module "express-session" {
  interface SessionDate {
    counter: number;
    username?: string;
  }
}

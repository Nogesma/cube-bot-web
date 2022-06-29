import { wrap } from "svelte-spa-router/wrap";
import Home from "./routes/Home.svelte";
import Solve from "./routes/Solve.svelte";

export default {
  "/": Home,
  "/timer/:event": Solve,
  "/settings": wrap({
    asyncComponent: () => import("./routes/Settings.svelte"),
  }),
  "/rankings": wrap({
    asyncComponent: () => import("./routes/Rankings.svelte"),
  }),
  "/auth/login": wrap({
    asyncComponent: () => import("./routes/auth/Login.svelte"),
  }),
  "/auth/oauth2callback": wrap({
    asyncComponent: () => import("./routes/auth/Callback.svelte"),
  }),
  "*": wrap({
    asyncComponent: () => import("./routes/404.svelte"),
  }),
};

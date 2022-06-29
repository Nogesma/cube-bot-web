import Home from "./routes/Home.svelte";
import NotFound from "./routes/404.svelte";
import Login from "./routes/auth/Login.svelte";
import Callback from "./routes/auth/Callback.svelte";
import Settings from "./routes/Settings.svelte";
import Solve from "./routes/Solve.svelte";
import Rankings from "./routes/Rankings.svelte";

export default {
  "/": Home,
  "/timer/:event": Solve,
  "/settings": Settings,
  "/rankings": Rankings,
  "/auth/login": Login,
  "/auth/oauth2callback": Callback,
  "*": NotFound,
};

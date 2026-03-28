import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";

{
  /* <StrictMode> */
}
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);

{
  /* redux */
}
{
  /* </StrictMode> */
}

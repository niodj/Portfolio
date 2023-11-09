
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { App }  from "./App";
import { store } from "./store"; // Assuming store is properly configured in './Todolist/store'

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

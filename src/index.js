import React from "react";
import {Provider} from "react-redux"
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";
import { ApiKeyProvider } from "./context/ApiKeyContext.tsx";
import store from "./Redux/store.tsx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ApiKeyProvider>
        <LoadingProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </LoadingProvider>
      </ApiKeyProvider>
    </BrowserRouter>
  </Provider>
);

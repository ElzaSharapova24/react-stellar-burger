import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { store } from "./services/store";
import { Provider } from 'react-redux';
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "./pages/login";



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter basename={"/"}>
          <Switch>
            {/*<Route index element={<App />} />*/}
            {/*<Route path="login" element={<Login />} />*/}
            <Route exact path="/">
              <App />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>

          {/*<App />*/}
        </BrowserRouter>
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

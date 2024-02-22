import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./services/store";
import { Provider } from 'react-redux';
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {BrowserRouter} from "react-router-dom";
import {createRoot} from 'react-dom/client';
import Router from "./components/router/router";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter basename={"/"}>
          <Router/>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  </React.StrictMode>,
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

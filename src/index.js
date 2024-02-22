import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { store } from "./services/store";
import { Provider } from 'react-redux';
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Login from "./pages/login";
import Register from "./pages/register";
import {createRoot} from 'react-dom/client';
import ForgotPassword from "./pages/forgot-password";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter basename={"/"}>
          <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  </React.StrictMode>,
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./services/store";
import { Provider } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./components/app";

ReactDOM.createRoot(document.getElementById("root") as MathMLElement).render(
    <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
            <BrowserRouter basename={"/"}>
                <App />
            </BrowserRouter>
        </DndProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
import {Route, Routes, useParams} from "react-router";
import Layout from "../layout/layout";
import Login from "../../pages/login";
import Profile from "../../pages/profile";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import clsx from "clsx";
import styles from "./app.module.css";
import AppHeader from "../app-header";
import React from "react";
import {useSelector} from "react-redux";
import {getIngredients} from "../../services/selectors";
import IngredientDetails from "../ingredient-details";
import ProtectedRoute from "../protected-route";

function App() {
  const { ingredients, bun, fillings, isLoading, order } =
    useSelector(getIngredients);
  const [orderDetailsModal, setOrderDetailsModal] = React.useState(false);
  const [ingredientModalItem, setIngredientModalItem] = React.useState(null);
  const [ingredientModalIsActive, setIngredientModalIsActive] =
    React.useState(false);
    return(
      <div className={clsx(styles.container)}>
        <AppHeader/>
        <Routes>
          <Route path="/" element={<Layout setOrderDetailsModal={setOrderDetailsModal}
                                           setIngredientModalItem={setIngredientModalItem}
                                           setIngredientModalIsActive={setIngredientModalIsActive}
                                           ingredientModalItem={ingredientModalItem}
                                           ingredientModalIsActive={ingredientModalIsActive}
                                           orderDetailsModal={orderDetailsModal}
                                           fillings={fillings}
                                           bun={bun}
                                           order={order}
                                           ingredients={ingredients}
                                           isLoading={isLoading}
          />}/>
          <Route path="/login" element={<ProtectedRoute onlyUnAuth><Login/></ProtectedRoute>}/>
          <Route path="/ingredients/:ingredients" element={<IngredientDetails/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/register" element={<ProtectedRoute onlyUnAuth><Register/></ProtectedRoute>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
        </Routes>
      </div>
    )
}

export default App;

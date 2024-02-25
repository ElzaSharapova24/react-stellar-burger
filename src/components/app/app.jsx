import {Route, Routes, useParams} from "react-router";
import Layout from "../layout/layout";
import Login from "../../pages/login";
import Profile from "../../pages/profile";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import clsx from "clsx";
import styles from "./app.module.css";
import AppHeader from "../app-header";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/selectors";
import IngredientDetails from "../ingredient-details";
import ProtectedRoute from "../protected-route";
import {authCheck, checkUserAuth, loginUser, registerUser} from "../../services/slices/routerSlice";

function App() {
  const { ingredients, bun, fillings, isLoading, order } =
    useSelector(getIngredients);
  const [orderDetailsModal, setOrderDetailsModal] = React.useState(false);
  const [ingredientModalItem, setIngredientModalItem] = React.useState(null);
  const [ingredientModalIsActive, setIngredientModalIsActive] =
    React.useState(false);
  const dispatch = useDispatch();
  
  const cbLogin = (data) => {
    dispatch(loginUser(data))
  }
  
  const cbRegister = (data) => {
    dispatch(registerUser(data))
  }
  
  useEffect(() =>{
    dispatch(checkUserAuth());
  }, [dispatch])
  
  useEffect(() =>{
    dispatch(authCheck());
  }, [dispatch])
  
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
          <Route path="/login" element={<ProtectedRoute onlyUnAuth><Login onLogin={cbLogin}/></ProtectedRoute>}/>
          <Route path="/ingredients/:ingredients" element={<IngredientDetails/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/register" element={<ProtectedRoute onlyUnAuth><Register onRegister={cbRegister}/></ProtectedRoute>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
        </Routes>
      </div>
    )
}

export default App;

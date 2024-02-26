import {Route, Routes, useLocation, useNavigate, useParams} from "react-router";
import Layout from "../layout/layout";
import LoginPage from "../../pages/login-page";
import ProfilePage from "../../pages/profile-page";
import RegisterPage from "../../pages/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page";
import clsx from "clsx";
import styles from "./app.module.css";
import AppHeader from "../app-header";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/selectors";
import IngredientDetails from "../ingredient-details";
import ProtectedRoute from "../protected-route";
import {authCheck, checkUserAuth, loginUser, registerUser} from "../../services/slices/routerSlice";
import {getIngredientsFetch} from "../../services/slices/ingredientSlice";
import Modal from "../modal";
import NotFoundPage from "../../pages/not-found-page";

function App() {
  const { ingredients, bun, fillings, isLoading, order } =
    useSelector(getIngredients);
  const [orderDetailsModal, setOrderDetailsModal] = React.useState(false);
  
  const dispatch = useDispatch();
  const location  = useLocation();
  const navigate = useNavigate();
  
  const cbLogin = (authData) => {
    dispatch(loginUser({authData}));
  }
  
  const cbRegister = (authData) => {
    dispatch(registerUser({authData}));
  }
  
  
  const backgroundLocation  = location.state?.backgroundLocation;
  
  useEffect(() => {
    dispatch(getIngredientsFetch());
  }, [dispatch]);
  
  useEffect(() =>{
    dispatch(checkUserAuth());
  }, [dispatch])
  
  useEffect(() =>{
    dispatch(authCheck());
  }, [dispatch])
  
  return(
      <div className={clsx(styles.container)}>
        <AppHeader/>
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<Layout setOrderDetailsModal={setOrderDetailsModal}
                                           orderDetailsModal={orderDetailsModal}
                                           fillings={fillings}
                                           bun={bun}
                                           order={order}
                                           ingredients={ingredients}
                                           isLoading={isLoading}
          />}/>
          <Route path="/register" element={<ProtectedRoute onlyUnAuth><RegisterPage onRegister={cbRegister}/></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
          <Route path="/login" element={<ProtectedRoute onlyUnAuth><LoginPage onLogin={cbLogin}/></ProtectedRoute>}/>
          <Route path="/ingredients/:id" element={<IngredientDetails/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
        {
          backgroundLocation && <Routes>
            <Route path="/ingredients/:id" element={
              <Modal
                title={"Детали ингредиента"}
                onClose={() => {
                  navigate(-1);
                }}
                className={"text text_type_main-large"}
              >
                <IngredientDetails />
              </Modal>
            }/>
          </Routes>
        }
        
      </div>
    )
}

export default App;

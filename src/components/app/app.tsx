import { Route, Routes, useLocation, useNavigate } from "react-router";
import {Location} from "react-router-dom"
import Layout from "../layout/layout";
import LoginPage from "../../pages/login-page";
import ProfilePage from "../../pages/profile-page";
import RegisterPage from "../../pages/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page";
import clsx from "clsx";
import styles from "./app.module.css";
import AppHeader from "../app-header";
import React, { useEffect, useState } from "react";
import { getIngredients } from "../../services/selectors";
import IngredientDetails from "../ingredient-details";
import ProtectedRoute from "../protected-route";
import {
  authCheck,
  checkUserAuth,
  loginUser,
  registerUser,
} from "../../services/slices/routerSlice";
import { getIngredientsFetch } from "../../services/slices/ingredientSlice";
import Modal from "../modal";
import NotFoundPage from "../../pages/not-found-page";
import { useDispatch, useSelector } from "../../services/hooks";
import { UserLoginDto, UserRegisterDto } from "../../types/slice-types";

const App = () => {
  const { ingredients, bun, fillings, isLoading, order } =
    useSelector(getIngredients);
  const [orderDetailsModal, setOrderDetailsModal] = useState<boolean>(false);

  const dispatch = useDispatch();
  const location: Location<{backgroundLocation: Location}> = useLocation();
  const navigate = useNavigate();

  const cbLogin = (authData: UserLoginDto) => {
    dispatch(loginUser(authData));
  };

  const cbRegister = (authData: UserRegisterDto) => {
    dispatch(registerUser(authData ));
  };

  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    dispatch(getIngredientsFetch());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  return (
    <div className={clsx(styles.container)}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route
          path="/"
          element={
            <Layout
              setOrderDetailsModal={setOrderDetailsModal}
              orderDetailsModal={orderDetailsModal}
              fillings={fillings}
              bun={bun}
              order={order}
              ingredients={ingredients}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth>
              <RegisterPage onRegister={cbRegister} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth>
              <LoginPage onLogin={cbLogin} />
            </ProtectedRoute>
          }
        />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password"
               element={
            <ProtectedRoute>
                <ResetPasswordPage/>
            </ProtectedRoute>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                title={"Детали ингредиента"}
                onClose={() => {
                  navigate(-1);
                }}
                className={"text text_type_main-large"}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;

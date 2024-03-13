import {Route, Routes, useLocation, useNavigate} from "react-router";
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
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {getIngredients, getOrder} from "../../services/selectors";
import IngredientDetails from "../ingredient-details";
import ProtectedRoute from "../protected-route";
import {authCheck, checkUserAuth, loginUser, registerUser,} from "../../services/slices/routerSlice";
import {getIngredientsFetch} from "../../services/slices/ingredientSlice";
import Modal from "../modal";
import NotFoundPage from "../../pages/not-found-page";
import {useDispatch, useSelector} from "../../services/hooks";
import {IngredientsDto, UserLoginDto, UserRegisterDto} from "../../types/slice-types";
import Feed from "../../pages/feed";
import OrderHistory from "../../pages/order-history";
import {getCookie} from "../../utils/cookie";
import {wsConnect} from "../../services/middleware/actions";
import {BASE_URL_WS_ORDERS, BASE_URL_WS_ORDERS_ALL} from "../../utils/api";
import OrderIngredientDetails from "../../pages/feed/order-feed/order/order-ingredient-details";

const App = () => {
    const { ingredients, bun, fillings, isLoading, order, imagesByIds } = useSelector(getIngredients);
    const [orderDetailsModal, setOrderDetailsModal] = useState<boolean>(false);
    const {orders} = useSelector(getOrder);

    const dispatch = useDispatch();
    const location: Location<{backgroundLocation: Location}> = useLocation();
    const navigate = useNavigate();

    const cbLogin = useCallback((authData: UserLoginDto) => {
        dispatch(loginUser(authData));
    }, [dispatch]);

    const cbRegister = useCallback((authData: UserRegisterDto) => {
        dispatch(registerUser(authData));
    }, [dispatch]);


    const backgroundLocation = location.state?.backgroundLocation;

    useEffect(() => {
        dispatch(getIngredientsFetch());
        dispatch(checkUserAuth());
        dispatch(authCheck());
        dispatch(wsConnect({wsUrl: BASE_URL_WS_ORDERS_ALL, withTokenRefresh:false}));

        const accessToken = getCookie("accessToken");
        if (accessToken){
            // const correctedToken = accessToken.replace('Bearer ', '');
            // const wsUrl = BASE_URL_WS_ORDERS + `?token=${correctedToken}`;
            // dispatch(wsConnect({wsUrl: wsUrl, withTokenRefresh:true}));
        }

        // return () => {
        //     dispatch(wsDisconnect())
        // }
    }, [dispatch])

    const totalPrice = useMemo(() => {
        return (
            fillings.reduce((a: number, c: IngredientsDto) => a + c.price, 0) +
            (bun !== null ? bun.price * 2 : 0)
        );
    }, [bun, fillings]);

    // @ts-ignore
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
                            totalPrice={totalPrice}
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
                <Route path="/feed" element={<Feed imagesByIds={imagesByIds} orders={orders}/>}/>
                <Route path="/feed/:id" element={
                    <OrderIngredientDetails imagesByIds={imagesByIds} orders={orders} totalPrice={totalPrice}/>} />
                <Route path="/profile/orders"
                       element={
                           <ProtectedRoute>
                               <OrderHistory imagesByIds={imagesByIds} orders={orders}/>
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
                    <Route path={"/feed/:id"} element={
                        <Modal onClose={() => {navigate(-1);}} title={''}>
                            <OrderIngredientDetails imagesByIds={imagesByIds} orders={orders} totalPrice={totalPrice}/>
                        </Modal>}/>
                </Routes>
            )}
        </div>
    );
}

export default App;

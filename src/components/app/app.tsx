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
import {getCurrentUserOrder, getIngredients, getOrder} from "../../services/selectors";
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
import {OrderIngredientDetails,
    SeparateOrderFeedIngredientDetails,
    SeparateOrderHistoryIngredientDetails} from "../../pages/feed/order-feed/order/order-ingredient-details";

const App = () => {
    const { ingredients, bun, fillings, isLoading, order, imagesByIds } = useSelector(getIngredients);
    const [orderDetailsModal, setOrderDetailsModal] = useState<boolean>(false);
    const {orders, total, totalToday} = useSelector(getOrder);
    const {orders: currentUserOrders} = useSelector(getCurrentUserOrder);

    const dispatch = useDispatch();
    const location: Location<{backgroundLocation: Location}> = useLocation();
    const navigate = useNavigate();

    const cbLogin = useCallback((authData: UserLoginDto) => {
        dispatch(loginUser(authData));
    }, [dispatch]);

    const cbRegister = useCallback((authData: UserRegisterDto) => {
        dispatch(registerUser(authData));
    }, [dispatch]);


    const backgroundLocation = location?.state?.backgroundLocation;

    useEffect(() => {
        dispatch(getIngredientsFetch());
        dispatch(checkUserAuth());
        dispatch(authCheck());
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
                    path="/login"
                    element={
                        <ProtectedRoute onlyUnAuth>
                            <LoginPage onLogin={cbLogin} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/ingredients/:id"
                    element={
                        <IngredientDetails />
                    }
                />
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
                <Route
                    path="/feed/:id"
                    element={
                        <SeparateOrderFeedIngredientDetails imagesByIds={imagesByIds} orders={orders}/>
                    }
                />
                <Route path="/feed" element={<Feed imagesByIds={imagesByIds} orders={orders} total={total} totalToday={totalToday}/>}/>

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/profile/orders"
                       element={
                           <ProtectedRoute>
                               <OrderHistory imagesByIds={imagesByIds} orders={currentUserOrders}/>
                           </ProtectedRoute>}
                />
                <Route
                    path={"/profile/orders/:id"}
                    element={
                        <SeparateOrderHistoryIngredientDetails imagesByIds={imagesByIds} orders={currentUserOrders} />
                    }
                />
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
                                <IngredientDetails/>
                            </Modal>
                        }
                    />
                    <Route
                        path={"/feed/:id"}
                        element={
                            <Modal
                                title={''}
                                onClose={() => {
                                    navigate(-1);
                                }}
                            >
                                <OrderIngredientDetails imagesByIds={imagesByIds} orders={orders}/>
                            </Modal>
                        }
                    />
                    <Route
                        path={"/profile/orders/:id"}
                        element={
                            <Modal
                                title={''}
                                onClose={() => {
                                    navigate(-1);
                                }}
                            >
                                <OrderIngredientDetails imagesByIds={imagesByIds} orders={currentUserOrders}/>
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    );
}

export default App;

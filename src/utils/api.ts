import { getCookie } from "./cookie";
import {
    UserDto,
    UserLoginDto,
    UserRegisterDto,
} from "../types/slice-types";

export const BASE_URL_WS_ORDERS: string = "wss://norma.nomoreparties.space/orders";
export const BASE_URL_WS_ORDERS_ALL: string = 'wss://norma.nomoreparties.space/orders/all';

const BASE_URL: string | null = "https://norma.nomoreparties.space/api";

const getIngredientsRequest = (): Promise<Response> => {
    return fetch(`${BASE_URL}/ingredients`);
};

function createOrderRequest(ingredients: string[]) : Promise<Response> {
    return fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" } as HeadersInit,
        body: JSON.stringify({ ingredients: ingredients }),
    });
}

function registerRequest({
                             email,
                             password,
                             name,
                         }: UserRegisterDto): Promise<Response> {
    return fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: getCookie("accessToken") as string,
        } as HeadersInit,
        body: JSON.stringify({ email, password, name }),
    });
}

function loginRequest({ email, password }: UserLoginDto): Promise<Response> {
    return fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: getCookie("accessToken") as string,
        } as HeadersInit,
        body: JSON.stringify({ email, password }),
    });
}

function logoutUserRequest(): Promise<Response> {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" } as HeadersInit,
        body: JSON.stringify({ token: getCookie("refreshToken") }),
    });
}

function getUserRequest(): Promise<Response> {
    return fetch(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
            authorization: getCookie("accessToken") as string,
        } as HeadersInit,
    });
}

function updateUserRequest({ email, name }: UserDto): Promise<Response> {
    return fetch(`${BASE_URL}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: getCookie("accessToken") as string,
        } as HeadersInit,
        body: JSON.stringify({ email, name }),
    });
}

function refreshTokenUserRequest() {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({token: getCookie("refreshToken")}),
    });
}

export {
    getIngredientsRequest,
    createOrderRequest,
    loginRequest,
    registerRequest,
    logoutUserRequest,
    getUserRequest,
    updateUserRequest,
    refreshTokenUserRequest
};

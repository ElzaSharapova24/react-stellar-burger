
import {getCookie} from "./cookie";

const BASE_URL: string = "https://norma.nomoreparties.space/api";

const getIngredientsRequest = (): Promise<Response> => {
    return fetch(`${BASE_URL}/ingredients`);
}

interface Ingredients {
    [key: string]: number;
}

function createOrderRequest(ingredients: Ingredients): Promise<Response> {
    return fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ingredients: ingredients}),
    });
}

interface RegisterData {
    email: string;
    password: string;
    name: string;
}

function registerRequest({ email, password, name }: RegisterData): Promise<Response> {
    return fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json", authorization: getCookie("accessToken")},
        body: JSON.stringify({email, password, name}),
    });
}

interface LoginData {
    email: string;
    password: string;
}

function loginRequest({ email, password }: LoginData): Promise<Response> {
    return fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json", authorization: getCookie("accessToken")},
        body: JSON.stringify({email, password}),
    });
}

function logoutUserRequest(): Promise<Response> {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: getCookie("refreshToken") }),
    });
}

function refreshTokenUserRequest(): Promise<Response> {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({token: getCookie("refreshToken")}),
    });
}

function getUserRequest(): Promise<Response> {
    return fetch(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {authorization: getCookie("accessToken")}
    });
}

interface UpdateUserData {
    email: string;
    name: string;
}

function updateUserRequest({email, name}: UpdateUserData): Promise<Response> {
    // @ts-ignore
    return fetch(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', authorization: getCookie('accessToken')},
        body: JSON.stringify({email, name})
    });
}

export { getIngredientsRequest, createOrderRequest, loginRequest, refreshTokenUserRequest, registerRequest, logoutUserRequest, getUserRequest, updateUserRequest};

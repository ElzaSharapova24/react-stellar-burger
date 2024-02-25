// import {getCookie} from "./cookie";

import {getCookie} from "./cookie";

const BASE_URL = "https://norma.nomoreparties.space/api";

const getIngredientsRequest = ()=> {
  return fetch(`${BASE_URL}/ingredients`);
}

function createOrderRequest(ingredients) {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ingredients: ingredients}),
  });
}
function registerRequest({ email, password, name }) {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password, name}),
  });
}

function loginRequest({ email, password }) {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password}),
  });
}

function logoutUserRequest() {
  // return fetch(`${BASE_URL}/auth/logout`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ token: getCookie("refreshToken") }),
  // });
}

function refreshTokenUserRequest() {
  // return fetch(`${BASE_URL}/auth/token`, {
  //   method: "POST",
  //   headers: {"Content-Type": "application/json"},
  //   body: JSON.stringify({token: getCookie("refreshToken")}),
  // });
}

function getUserRequest() {
  return fetch(`${BASE_URL}/auth/user`, {
    headers: {
      authorization: getCookie("accessToken")
    }
  });
}

export { getIngredientsRequest, createOrderRequest, loginRequest, refreshTokenUserRequest, registerRequest, logoutUserRequest, getUserRequest };

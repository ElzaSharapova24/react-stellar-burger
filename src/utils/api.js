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
function registerUserRequest({ email, password, name }) {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password, name}),
  });
}

function loginUserRequest({ email, password }) {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password}),
  });
}

function logoutUserRequest() {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
}


function refreshTokenUserRequest() {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    // body: JSON.stringify({token: getCookie("refreshToken")}),
  });
}

export { getIngredientsRequest, createOrderRequest, loginUserRequest, refreshTokenUserRequest, registerUserRequest, logoutUserRequest };

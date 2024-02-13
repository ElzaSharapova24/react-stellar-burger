
const BASE_URL = "https://norma.nomoreparties.space/api";


function getIngredientsRequest() {
  return fetch(`${BASE_URL}/ingredients`);
}

function createOrderRequest (ingredients) {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"ingredients": ingredients}),
  });
}

export {getIngredientsRequest, createOrderRequest};



const BASE_URL = "https://norma.nomoreparties.space/api";


function getIngredientsRequest() {
  return fetch(`${BASE_URL}/ingredients`);
}

// function createOrderRequest () {
//   return fetch(`${BASE_URL}/orders`, {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({"ingredients": []}),
//   });
// };
//
// console.log(createOrderRequest())


const getOrderByNumberRequest = (number) => {
  return fetch(`${BASE_URL}/orders/${number}`);
};

export {getIngredientsRequest, getOrderByNumberRequest};


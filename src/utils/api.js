
function onResponse(res) {
  return res.ok ? res.json() : res.json().then((error) =>  Promise.reject(`Ошибка: ${error}`))
}

const BASE_URL = "https://norma.nomoreparties.space/api";


export default function getIngredientsRequest() {
  return fetch(`${BASE_URL}/ingredients`, {
  }).then(onResponse)
}


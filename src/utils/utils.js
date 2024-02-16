const categoriesNames = {
  bun: "Булки",
  main: "Начинка",
  sauce: "Соусы",
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export {categoriesNames, checkResponse};

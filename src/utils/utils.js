const categoriesNames = {
  bun: "Булки",
  main: "Начинка",
  sauce: "Соусы",
};

function checkResponse(res, err) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject({...err, statusCode: res.status});
}

export {categoriesNames, checkResponse};

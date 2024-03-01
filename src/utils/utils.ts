const categoriesNames: Record<string, string> = {
  bun: "Булки",
  main: "Начинка",
  sauce: "Соусы",
};

function checkResponse(res: Response, err: Record<string, unknown>) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject({ ...err, statusCode: res.status });
}

export {categoriesNames, checkResponse};

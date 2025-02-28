import { generateDate } from "../utils";

export const addUser = (login, password) =>
  fetch("http://localhost:3005/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      login, //название и значения св-в совпадают, можно использовать сокр запись
      password,
      registed_at: generateDate(),
      role_id: 2,
    }),
  }).then((createdUser) => createdUser.json());

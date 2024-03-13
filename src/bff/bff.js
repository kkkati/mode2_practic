import { getUser } from "./get-user";
import { addUser } from "./add-user";
import { createSession } from "./create-session";

export const server = {
  async authorize(authLogin, autPassword) {
    const user = await getUser(authLogin);

    if (!user) {
      return {
        error: "Такого пользователя не существует",
        res: null,
      };
    }

    if (autPassword !== user.password) {
      return {
        error: "Неверный пароль",
        res: null,
      };
    }

    return {
      error: null,
      res: createSession(user.role_id),
    };
  },
  async register(regLogin, regPassword) {
    const user = await getUser(regLogin);

    if (user) {
      return {
        error: "Неверный пароль",
        res: null,
      };
    }

    await addUser(regLogin, regPassword);

    return {
      error: null,
      res: createSession(user.role_id),
    };
  },
};

import { sessions } from "../sessions";
import { getUser } from "../api";

export const authorize = async (authLogin, autPassword) => {
  const user = await getUser(authLogin);

  if (!user) {
    return {
      error: "Такого пользователя не существует",
      res: null,
    };
  }

  const { id, login, password, roleId } = user;

  if (autPassword !== password) {
    return {
      error: "Неверный пароль",
      res: null,
    };
  }

  return {
    error: null,
    res: {
      id,
      login,
      roleId,
      session: sessions.create(user),
    },
  };
};

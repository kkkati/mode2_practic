import { ROLE } from "../constans";
import { sessions } from "../sessions";
import { getUsers } from "../api";

export const fetchUsers = async (userSession) => {
  const accessRoles = [ROLE.ADMIN];

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  const roles = await getUsers();

  return {
    error: null,
    res: roles,
  };
};

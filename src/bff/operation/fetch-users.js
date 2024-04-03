import { ROLE } from "../constans";
import { sessions } from "../sessions";
import { getUsers } from "../api";

export const fetchUsers = async (hash) => {
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);
  if (!access) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  const users = await getUsers();

  return {
    error: null,
    res: users,
  };
};

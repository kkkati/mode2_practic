import { sessions } from "../sessions";

export const checkAccess = (userSession, accessRoles) => {
  const user = sessions.list[userSession];

  return !!user && accessRoles.includes(user.roleId);
};

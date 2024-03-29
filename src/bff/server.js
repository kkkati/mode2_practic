import {
  authorize,
  fetchRoles,
  fetchUsers,
  logout,
  register,
  updateUserRole,
  removeUser,
} from "./operation";

export const server = {
  authorize,
  logout,
  register,
  fetchRoles,
  fetchUsers,
  updateUserRole,
  removeUser,
};

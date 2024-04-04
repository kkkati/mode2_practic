import { updatePost } from "../api";
import { ROLE } from "../constans";
import { sessions } from "../sessions";

export const savePost = async (hash, newPostData) => {
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);
  if (!access) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  const updatedPost = await updatePost(newPostData);

  return {
    error: null,
    res: updatedPost,
  };
};

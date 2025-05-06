import { avatars } from "../constants/avatars";

export const getAvatarById = (id) => {
  const avatar = avatars.find((a) => a.key === id);
  return avatar ? avatar.src : require("../assets/avatars/add.png");
};

import { IUser } from "./interfaces";

export const getUserWithoutPassword = (user: IUser) => {
  return Object.fromEntries(
    Object.entries(user).filter((entry) => entry[0] !== "password")
  );
};

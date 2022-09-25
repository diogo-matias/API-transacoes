import User from "../models/user";

export const users: User[] = [];

export function findById(id: string) {
  return users.find((user) => user.id === id);
}

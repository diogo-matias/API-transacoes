import { Request, Response } from "express";
import User, { userData } from "../models/user";
import { users } from "../db/users";

export default class UsersController {
  create(req: Request, res: Response) {
    const data = req.body;

    try {
      const user = new User(data);
      users.push(user);
      res.json({ message: "Usuario criado com sucesso", user });
    } catch (err: any) {
      res.json(err.message);
    }
  }

  getUsers(req: Request, res: Response) {
    const { name, cpf, email } = req.query;
    let filtredUsers: User[] = users;

    filtredUsers = users.filter((user) => {
      let searchName = name || user.name;
      let searchEmail = email || user.email;
      let searchCpf = cpf || user.cpf;

      if (
        user.email
          .toLocaleLowerCase()
          .includes(searchEmail.toString().toLocaleLowerCase()) &&
        user.name
          .toLocaleLowerCase()
          .includes(searchName.toString().toLocaleLowerCase()) &&
        user.cpf
          .toLocaleLowerCase()
          .includes(searchCpf.toString().toLocaleLowerCase())
      ) {
        return user;
      }
    });

    const parsedUsers = filtredUsers.map((user) => {
      return user.getAtributes();
    });

    res.json(parsedUsers);
  }

  getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = users.find((user) => user.id === id)?.getAtributes();

    if (!user) {
      return res.status(404).json("Usuario não encontrado");
    }

    res.json(user);
  }

  deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json("Usuario não encontrado");
    }
    users.splice(userIndex, 1);
    res.json("Deletado com sucesso");
  }

  editUser(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const user = users.find((user) => user.id === id);

    if (!user) return res.json("ID não encontrado");

    user.edit(data);
    res.json("Usuario editado com sucesso");
  }
}

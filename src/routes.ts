import { Express } from "express";
import TransactionController from "./controllers/transationController";
import UsersController from "./controllers/usersController";

const usersController = new UsersController();
const transactionController = new TransactionController();

export default class Routes {
  users(app: Express) {
    app.post("/users", usersController.create);
    app.get("/users", usersController.getUsers);
    app.get("/users/:id", usersController.getUserById);
    app.delete("/users/:id", usersController.deleteUser);
    app.put("/users/:id", usersController.editUser);
    app.post("/users/:id/transactions", transactionController.create);
    app.get("/users/:id/transactions", transactionController.getTransactions);
    app.get(
      "/users/:id/transactions/:transactionID",
      transactionController.getTransactionById
    );
    app.delete(
      "/users/:id/transactions/:transactionID",
      transactionController.deleleTransaction
    );
    app.put(
      "/users/:id/transactions/:transactionID",
      transactionController.updateTransaction
    );
  }
}

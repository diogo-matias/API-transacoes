import { Request, Response } from "express";
import User from "../models/user";
import Transaction from "../models/transaction";
import { users } from "../db/users";
import { findById } from "../db/users";
import { json } from "stream/consumers";

export default class TransactionController {
  create(req: Request, res: Response) {
    const { title, type, value } = req.body;
    const { id } = req.params;
    const user = findById(id);

    if (!user) return res.status(404).json("usuário não encontrado");

    try {
      const transaction = new Transaction({ title, type, value });
      user.edit({ transaction });
      res.json("Transação criada com sucesso");
    } catch (err: any) {
      res.json(err.message);
    }
  }

  getTransactions(req: Request, res: Response) {
    const { id } = req.params;
    const user = findById(id);

    if (!user) {
      return res.status(404).json("ERROR: User not found");
    }

    const transactions = user.t;

    res.json(transactions);
  }
  getTransactionById(req: Request, res: Response) {
    const { id, transactionID } = req.params;
    const user = findById(id);

    if (!user) {
      return res.status(404).json("ERROR: User not found");
    }

    const transaction = user.t.find(
      (transaction) => transaction.id === transactionID
    );

    if (!transaction) {
      return res.status(404).json("ERROR: Transaction not found");
    }

    return res.json(transaction);
  }

  deleleTransaction(req: Request, res: Response) {
    const { id, transactionID } = req.params;
    const user = findById(id);

    if (!user) return res.status(404).json("ERROR: User not found");

    const transaction = user.t.find(
      (transaction) => transaction.id === transactionID
    );

    if (!transaction) {
      return res.status(404).json("ERROR: Transaction not found");
    }

    user.deleteTransaction(transactionID);
    res.json(user.t);
  }

  updateTransaction(req: Request, res: Response) {
    const { id, transactionID } = req.params;
    const data = req.body;
    const user = findById(id);
    if (!user) return res.status(404).json("ERROR: User not found");
    const transaction = user.t.find(
      (transaction) => transaction.id === transactionID
    );
    if (!transaction) {
      return res.status(404).json("ERROR: Transaction not found");
    }

    try {
      transaction.edit(data);
      res.json({ message: "Editado com sucesso", payload: transaction });
    } catch (err: any) {
      return res.json(err.message);
    }
  }
}

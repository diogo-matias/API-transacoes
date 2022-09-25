import crypto from "crypto";
import { stringify } from "querystring";
import Transaction from "./transaction";

export interface UserData {
  name: string;
  cpf: string;
  email: string;
  age: number;
  transaction?: Transaction;
}
export interface EditUserData {
  name?: string;
  cpf?: string;
  email?: string;
  age?: number;
  transaction?: Transaction;
}

export default class User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  age: number;
  private transactions: Transaction[];

  get t() {
    return this.transactions;
  }

  constructor(data: UserData) {
    const { name, age, cpf, email } = this.verifyData(data);
    this.id = crypto.randomUUID();
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.age = age;
    this.transactions = [];
  }

  verifyData(data: UserData) {
    const { name, age, cpf, email } = data;
    const missingAtributes = [];

    if (!name) missingAtributes.push("name");
    if (!cpf) missingAtributes.push("cpf");
    if (!email) missingAtributes.push("email");
    if (!age) missingAtributes.push("age");

    if (missingAtributes.length) {
      throw new Error(`Missing atributes: ${missingAtributes}`);
    }

    return data;
  }

  getAtributes() {
    let response = {};

    const privateAtributes = ["transactions"];

    // Retorna a resposta filtrada de acordo com os atributos privados
    for (const key in this) {
      if (!privateAtributes.some((atribute) => atribute === key)) {
        response[key] = this[key];
      }
    }

    return response;
  }

  edit(data: EditUserData) {
    const { age, cpf, email, name, transaction } = data;

    if (name) this.name = name;
    if (cpf) this.cpf = cpf;
    if (age) this.age = age;
    if (email) this.email = email;
    if (transaction) this.transactions.push(transaction);
  }

  deleteTransaction(id: string) {
    const t = this.transactions;
    this.transactions = t.filter((transaction) => transaction.id !== id);
  }
}

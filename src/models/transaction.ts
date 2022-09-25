import crypto from "crypto";

interface transactionData {
  title: string;
  value: number;
  type: "INCOME" | "OUTCOME";
}
interface transactionEditData {
  title?: string;
  value?: number;
  type?: "INCOME" | "OUTCOME";
}

export default class Transaction {
  id: string;
  title: string;
  value: number;
  type: "INCOME" | "OUTCOME";

  constructor(data: transactionData) {
    const { title, value, type } = this.verifyData(data);
    this.id = crypto.randomUUID();
    this.title = title;
    this.value = value;
    this.type = type;
  }

  verifyData(data: transactionData) {
    const { title, value, type } = data;
    const missingAtributes = [];

    if (!title) missingAtributes.push("title");
    if (!value) missingAtributes.push("value");
    if (!type) missingAtributes.push("type");

    if (missingAtributes.length) {
      throw new Error(`Missing atributes: ${missingAtributes}`);
    }

    if (type !== "INCOME" && type !== "OUTCOME") {
      throw new Error(`ERROR: Type must be INCOME or OUTCOME`);
    }

    return data;
  }

  edit(data: transactionEditData) {
    const { title, type, value } = data;

    if (type !== "INCOME" && type !== "OUTCOME") {
      throw new Error(`ERROR: Type must be INCOME or OUTCOME`);
    }

    this.title = title || this.title;
    this.type = type || this.type;
    this.value = value || this.value;
  }
}

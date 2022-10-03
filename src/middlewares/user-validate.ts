import { NextFunction, Request, Response } from "express";
import { findById, users } from "../db/users";

export default class UserValidate {
  validate(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const userValidate = findById(id);

    if (!userValidate) {
      return response
        .status(404)
        .json({ error: "User not found! please try again" });
    }

    return next();
  }
}

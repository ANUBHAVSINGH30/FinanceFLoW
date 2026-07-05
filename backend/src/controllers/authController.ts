import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService.js";

export class AuthController {
  static async signup(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AuthService.signup(req.body);

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async signin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AuthService.signin(req.body);

      return res.status(200).json({
        success: true,
        message: "Signin successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async me(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.userId!;

      const user = await AuthService.getMe(userId);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}
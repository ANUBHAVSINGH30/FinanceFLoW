import { AuthService } from "../services/authService.js";
export class AuthController {
    static async signup(req, res, next) {
        try {
            const result = await AuthService.signup(req.body);
            return res.status(201).json({
                success: true,
                message: "User created successfully",
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async signin(req, res, next) {
        try {
            const result = await AuthService.signin(req.body);
            return res.status(200).json({
                success: true,
                message: "Signin successful",
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async me(req, res, next) {
        try {
            const userId = req.userId;
            const user = await AuthService.getMe(userId);
            return res.status(200).json({
                success: true,
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateProfile(req, res, next) {
        try {
            const userId = req.userId;
            const user = await AuthService.updateProfile(userId, req.body);
            return res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async changePassword(req, res, next) {
        try {
            const userId = req.userId;
            const result = await AuthService.changePassword(userId, req.body);
            return res.status(200).json({
                success: true,
                message: result.message,
            });
        }
        catch (error) {
            next(error);
        }
    }
}

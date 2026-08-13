import { ZodError } from "zod";
export const validateQuery = (schema) => (req, res, next) => {
    try {
        req.validatedQuery = schema.parse(req.query);
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.issues,
            });
        }
        next(error);
    }
};

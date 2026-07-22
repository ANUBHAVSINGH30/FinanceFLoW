import rateLimit from "express-rate-limit";

//strict for brute force- sensitive routes
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 50,
    message: { success: false, message: "Too many attempts, please try again after 15 minutes" },
    standardHeaders: true,
    legacyHeaders: false
});

//general for other routes.
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: "Too many attemp, please try again after 15 min"},
    standardHeaders: true,
    legacyHeaders: false
});


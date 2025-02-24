import { ApiError } from "../../exceptions/api-error.js";

export function ErrorMiddleware(err, req, res, next) {
    if (!err) {
        return next();
    }

    if (process.env.NODE_ENV === "development") {
        console.error(err);
    }

    if (err instanceof ApiError) {
        return res.status(err.status || 500).json({
            message: err.message,
            errors: err.errors || []
        });
    }

    return res.status(500).json({
        message: "Unexpected error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
}

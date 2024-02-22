import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError"

const errorMiddleware = (err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
}

export { errorMiddleware }
import { NextFunction, Request, Response, type Express } from "express";
import { connectDB } from "./DB";
import { authRouter, commentRouter, postRouter, userRouter } from "./module";
import { AppError } from "./utilities";
export function bootstrap(app: Express, express: any) {
  connectDB();
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/post", postRouter);
  app.use("/comment", commentRouter);

  app.use("/{*dummy}", (req, res, next) => {
    return res.status(404).json({ message: "Not Found", success: false });
  });
  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    return res.status(err.statusCode || 500).json({
      message: err.message,
      success: false,
      errorsDetails: err.errorsDetails,
    });
  });
}

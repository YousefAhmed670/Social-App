import type { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../DB";

class UserService {
  private readonly userRepository = new UserRepository();
  constructor() {}

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.userRepository.getOne({ _id: req.params.id });
    return res.status(200).json({
      message: "User profile retrieved successfully",
      success: true,
      data: { user },
    });
  };
}

export default new UserService();

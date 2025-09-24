import type { Request, Response } from "express";
import {
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
  VerifyEmailDTO,
} from "./auth.dto";
import { AuthFactoryService } from "./factory";
import * as utilities from "../../utilities";
import { TokenRepository, UserRepository } from "../../DB";
import { AuthProvider } from "./provider";
class AuthService {
  private readonly userRepository = new UserRepository();
  private readonly tokenRepository = new TokenRepository();
  private readonly authFactoryService = new AuthFactoryService();
  constructor() {}

  register = async (req: Request, res: Response) => {
    const registerDto: RegisterDTO = req.body;
    const userExist = await this.userRepository.exists({
      email: registerDto.email,
    });
    if (userExist) {
      throw new utilities.ConflictException("User already exists");
    }
    const user = await this.authFactoryService.registerFactory(registerDto);
    const createdUser = await this.userRepository.create(user);
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      data: { createdUser },
    });
  };

  verifyEmail = async (req: Request, res: Response) => {
    const { otp, email }: VerifyEmailDTO = req.body;
    await AuthProvider.checkOTP(email, otp);
    await this.userRepository.update(
      { email },
      {
        $unset: { otp: "", otpExpireAt: "" },
        $set: { isVerified: true },
      }
    );
    return res.status(200).json({
      message: "Email verified successfully",
      success: true,
    });
  };

  sendOTP = async (req: Request, res: Response) => {
    const { email } = req.body;
    const userExist = await this.userRepository.exists({ email });
    if (!userExist) {
      throw new utilities.NotFoundException("User not found");
    }
    if (
      userExist.otp &&
      userExist.otpExpireAt &&
      userExist.otpExpireAt.getTime() > Date.now()
    ) {
      throw new utilities.BadRequestException("OTP already sent");
    }
    if (userExist.userAgent != utilities.USER_AGENT.Google) {
      const OTP = utilities.generateOTP();
      const otpExpireAt = utilities.generateExpiryTime(10);
      utilities.eventEmitter.emit("sendOTP", {
        email: userExist.email,
        otp: OTP,
      });
      const hashedOTP = await utilities.generateHash(OTP);
      await this.userRepository.update(
        { email },
        { otp: hashedOTP, otpExpireAt }
      );
    }
    return res.status(200).json({
      message: "OTP sent successfully",
      success: true,
    });
  };

  login = async (req: Request, res: Response) => {
    const loginDTO: LoginDTO = req.body;
    const userExist = await this.userRepository.exists({
      email: loginDTO.email,
    });
    if (!userExist) {
      throw new utilities.NotFoundException("User not found");
    }
    if (
      !userExist.password ||
      !(await utilities.compareHash(loginDTO.password, userExist.password))
    ) {
      throw new utilities.BadRequestException("Invalid password");
    }
    if (!userExist.isVerified) {
      throw new utilities.BadRequestException("User not verified");
    }
    const accessToken = utilities.generateToken(userExist._id.toString());
    const refreshToken = utilities.generateRefreshToken(
      userExist._id.toString()
    );
    await this.tokenRepository.create({
      userId: userExist._id.toString(),
      token: refreshToken,
      type: utilities.TOKEN_TYPE.Refresh,
    });
    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: { accessToken, refreshToken },
    });
  };

  resetPassword = async (req: Request, res: Response) => {
    const resetPasswordDto: ResetPasswordDTO = req.body;
    await AuthProvider.checkOTP(resetPasswordDto.email, resetPasswordDto.otp);
    if (resetPasswordDto.password !== resetPasswordDto.confirmPassword) {
      throw new utilities.BadRequestException("Passwords do not match");
    }
    await this.userRepository.update(
      { email: resetPasswordDto.email },
      {
        password: await utilities.generateHash(resetPasswordDto.password),
        $unset: { otp: "", otpExpireAt: "" },
      }
    );
    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  };
}

export default new AuthService();

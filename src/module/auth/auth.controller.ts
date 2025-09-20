import { Router } from "express";
import authService from "./auth.service";
import * as authValidation from "./auth.validation";
import { isValid } from "../../middleware";
const router = Router();

router.post(
  "/register",
  isValid(authValidation.registerSchema),
  authService.register
);
router.post("/login", isValid(authValidation.loginSchema), authService.login);
router.post("/send-otp", authService.sendOTP);
router.post(
  "/verify-email",
  isValid(authValidation.verifyEmailSchema),
  authService.verifyEmail
);
router.put(
  "/reset-password",
  isValid(authValidation.resetPasswordSchema),
  authService.resetPassword
);

export default router;

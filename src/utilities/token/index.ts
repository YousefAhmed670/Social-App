import jwt from "jsonwebtoken";
import devConfig from "../../env/dev.config";
export const generateToken = (id: string) => {
  return jwt.sign({ id }, devConfig.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};
export const verifyToken = (token: string) => {
  return jwt.verify(token, devConfig.JWT_SECRET as string);
};
export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, devConfig.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, devConfig.JWT_REFRESH_SECRET as string);
};
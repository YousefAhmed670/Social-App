import { GENDER, SYS_ROLE, TOKEN_TYPE, USER_AGENT } from "../enum";

export interface IUser {
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  password: string;
  credentialUpdatedAt: Date;
  phoneNumber?: string;
  role: SYS_ROLE;
  gender: GENDER;
  userAgent: USER_AGENT;
  otp?: string;
  otpExpireAt?: Date;
  isVerified?: boolean;
}

export interface IBlackListToken {
  userId: string;
  token: string;
  type: TOKEN_TYPE;
}

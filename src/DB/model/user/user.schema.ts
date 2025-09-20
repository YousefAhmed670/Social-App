import { Schema } from "mongoose";
import { IUser } from "../../../utilities/common/interface";
import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utilities/common/enum";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 20,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 20,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: function () {
        if (this.userAgent === USER_AGENT.Google) {
          return false;
        }
        return true;
      },
    },
    credentialUpdatedAt: Date,
    phoneNumber: String,
    role: { type: String, enum: SYS_ROLE, default: SYS_ROLE.User },
    gender: { type: String, enum: GENDER, default: GENDER.Male },
    userAgent: { type: String, enum: USER_AGENT, default: USER_AGENT.Local },
    otp: String,
    otpExpireAt: Date,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);
userSchema
  .virtual("fullName")
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (value: string) {
    this.firstName = value.split(" ")[0] as string;
    this.lastName = value.split(" ")[1] as string;
  });

export default userSchema;

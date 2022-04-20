import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    photo: {
      type: String,
      required: false
    },
    fullname: {
      type: String,
      required: true
    },
    ip: {
      type: String,
      required: false
    },
    geo: {
      type: Object,
      required: false
    },
    password: {
      type: String,
      required: true,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserPermission",
      },
    ]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10)
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

export default model("User", userSchema)
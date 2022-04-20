  
import { Schema, model } from "mongoose";

const permissionSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("UserPermission", permissionSchema)
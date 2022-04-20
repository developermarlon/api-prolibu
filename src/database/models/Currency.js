import { Schema, model } from "mongoose";

const currencySchema = new Schema(
    {
        code: {
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            unique: true,
            required: false
        },
        value: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Currency", currencySchema)
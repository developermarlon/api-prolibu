import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        sku: {
            type: String,
            unique: false,
            required: true
        },
        name: {
            type: String,
            unique: true,
            required: true
        },
        price: {
            type: Number,
            unique: false,
            required: true
        },
        currency: {
            type: String,
            unique: false,
            required: true
        },
        textRate: {
            type: Number,
            unique: false,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Product", productSchema)
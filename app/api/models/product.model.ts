import { link } from "fs";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        image: { type: String, required: true},
        name: { type: String, required: true},
        harga: { type: Number, required: true},
        link: { type: String, required: true},
        deskripsi: { type: String, required: true},
    },
    {timestamps: true}
);

const Product =
    mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
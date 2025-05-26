import { connectDB } from "../db/connectDB";
import Product from "../models/product.model";

export async function GET(request: Request) {
    console.log("Search API called");
    await connectDB();

    try {
        const { searchParams } = new URL(request.url);
        const searchTerm = searchParams.get("searchTerm");
        console.log("Search term:", searchTerm);

        if (!searchTerm) {
            console.log("No search term provided");
            return Response.json({ products: [] }, { status: 200 });
        }

        const products = await Product.find({
            name: { $regex: searchTerm, $options: 'i' }
        }).sort({ createdAt: -1 });

        console.log("Found products:", products);
        return Response.json({ products }, { status: 200 });
    } catch (error: any) {
        console.log("Error searching products:", error);
        return Response.json({ error: error.message }, { status: 400 });
    }
}
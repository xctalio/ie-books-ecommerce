"use server";

import { connectDB } from "@/app/api/db/connectDB";
import cloudinary from "./cloudinary";
import Product from "@/app/api/models/product.model";

// Define Cloudinary response interface
interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export async function addAction(formData: FormData) {
  try {
    // Check Cloudinary configuration first
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("Cloudinary environment variables missing:", {
        cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
        api_key: !!process.env.CLOUDINARY_API_KEY,
        api_secret: !!process.env.CLOUDINARY_API_SECRET
      });
      return {
        error: "Server configuration error. Please check environment variables.",
      };
    }

    const image = formData.get("image") as File;
    const name = formData.get("name");
    const harga = formData.get("harga");
    const link = formData.get("link");
    const deskripsi = formData.get("deskripsi");

    if (!image || !name || !harga || !link || !deskripsi) {
      console.log("Missing required fields");
      return {
        error: "All fields are required.",
      };
    }

    // Validate image file
    if (image.size === 0) {
      return {
        error: "Please select a valid image file.",
      };
    }

    if (!image.type.startsWith('image/')) {
      return {
        error: "Please select a valid image file.",
      };
    }

    await connectDB();

    console.log("Starting image upload to Cloudinary...");
    
    // Image processes with proper TypeScript typing
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    const imageResponse = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "web-crud",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary error details:", error);
              return reject(error);
            }
            if (!result) {
              return reject(new Error("No result from Cloudinary"));
            }
            resolve(result as CloudinaryUploadResult);
          }
        )
        .end(buffer);
    });

    console.log("Image uploaded successfully:", imageResponse.secure_url);

    // Validate that we have a secure_url
    if (!imageResponse.secure_url) {
      return {
        error: "Failed to upload image. Please try again.",
      };
    }

    // Store in DB
    const newProduct = await Product.create({
      image: imageResponse.secure_url,
      name,
      harga,
      link,
      deskripsi,
    });

    console.log("Product created successfully");

    return {
      success: "Product added successfully",
    };
  } catch (error) {
    console.error("Error in addAction:", error);
    
    // Return specific error for Cloudinary issues
    if (error instanceof Error && error.message.includes('api_key')) {
      return {
        error: "Cloudinary configuration error. Please check API credentials.",
      };
    }
    
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
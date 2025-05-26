"use client";

import { addAction } from "@/utils/addAction";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const AddForm = () => {
  const router = useRouter();
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function clientAddAction(formData: FormData) {
    setIsLoading(true);
    const { error, success } = await addAction(formData);

    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success(success);
      router.push("/");
      setImageURL("");
    }
    setIsLoading(false);
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = file.size;

      if (Math.round(fileSize / 1024) > 1024) {
        toast.error("Image lebih besar dari 1mb tidak di bolehkan");
      } else {
        setImageURL(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              Add New Product
            </h2>
            <p className="text-gray-600">Fill in the details to add your product</p>
          </div>

          <form action={clientAddAction} className="space-y-8">
            <div className="group">
              <label className="block text-sm font-medium text-black mb-3">
                Product Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-lg hover:border-gray-400 transition-all duration-300">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 1MB</p>
                </div>
              </div>
              
              {imageURL && (
                <div className="mt-6 transform transition-all duration-300 hover:scale-[1.02]">
                  <Image
                    src={imageURL}
                    alt="Preview"
                    width={1000}
                    height={1000}
                    className="max-w-full max-h-72 object-cover object-center rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="group">
                <label className="block text-sm font-medium text-black mb-3">
                  Product Name
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  className="w-full rounded-lg border-gray-200 focus:border-black focus:ring-black transition-all duration-300"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-black mb-3">
                  Price
                </label>
                <Input
                  type="number"
                  name="harga"
                  placeholder="Enter price"
                  className="w-full rounded-lg border-gray-200 focus:border-black focus:ring-black transition-all duration-300"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-black mb-3">
                Sales Link
              </label>
              <Input
                type="text"
                name="link"
                placeholder="Enter seller's link"
                className="w-full rounded-lg border-gray-200 focus:border-black focus:ring-black transition-all duration-300"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-black mb-3">
                Description
              </label>
              <textarea
                name="deskripsi"
                placeholder="Enter product description"
                rows={4}
                className="w-full rounded-lg border-gray-200 focus:border-black focus:ring-black transition-all duration-300 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Product...
                  </span>
                ) : (
                  "Add Product"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
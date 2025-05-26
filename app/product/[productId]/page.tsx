"use client";

import ProductList from "@/components/ProductList";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatPrice } from "@/utils/formatPrice";

interface Product {
  image: string;
  _id: string;
  name: string;
  harga: number;
  link: string;
  deskripsi: string;
}

const ProductPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const [product, setProduct] = useState<Product>();

  const handleDelete = async () => {
    const response = await axios.delete(`/api/product/${params.productId}`);

    toast.success(response.data.message);
    router.push("/");
  };

  useEffect(() => {
    axios
      .get(`/api/product/${params.productId}`)
      .then((response) => setProduct(response.data.product));
  }, []);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        <div className="animate-pulse">
          {/* Back button skeleton */}
          <div className="h-6 w-20 bg-gray-200 rounded mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image skeleton */}
            <div className="relative aspect-square bg-gray-200 rounded-lg"></div>

            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>

              <div className="h-8 w-1/3 bg-gray-200 rounded"></div>

              <div className="space-y-3">
                <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                  <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* Related products skeleton */}
          <div className="mt-16">
            <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-3">
                  <div className="aspect-[4/3] bg-gray-200 rounded-lg"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1.5 z-10">
                  <Link 
                    href={`/product/${product._id}/update`}
                    className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Update
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="block w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(product.harga)}
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{product.deskripsi}</p>
          </div>

          <Link 
            href={product.link} 
            target="_blank"
            className="block w-full"
          >
            <button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] text-sm">
              Contact Seller
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          You might also like
        </h2>
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;
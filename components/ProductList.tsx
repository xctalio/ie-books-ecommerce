"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatPrice } from "@/utils/formatPrice";

interface Product {
  _id: string;
  name: string;
  harga: number;
  image: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/fetch-products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div id="product" className="max-w-6xl mx-auto px-4 md:px-12 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Products
        </h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product, index) => (
          <Link
            href={`/product/${product._id}`}
            key={index}
            className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={225}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
            <div className="p-4">
              <h2 className="font-medium text-base text-gray-900 mb-1 line-clamp-1 group-hover:text-black transition-colors duration-300">
                {product.name}
              </h2>
              <p className="text-base font-semibold text-black">
                {formatPrice(product.harga)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

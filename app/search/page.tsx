"use client";

import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";

interface Product {
    _id: string;
    name: string;
    harga: number;
    image: string;
}

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('searchTerm');
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/search?searchTerm=${query}`);
                setProducts(response.data.products);
                setError(null);
            } catch (err) {
                setError('Failed to fetch products');
                console.error('Error fetching products:', err);
            }
        };

        if (query) {
            fetchProducts();
        }
    }, [query]);

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
            <h1 className="text-xl font-semibold mb-6">
                Search Results for "{query}"
            </h1>

            {error ? (
                <div className="text-center py-8">
                    <p className="text-red-600">Error: {error}</p>
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product: Product, index) => (
                        <Link
                            href={`/product/${product._id}`}
                            key={index}
                            className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                        >
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-3">
                                <h2 className="font-medium text-sm text-gray-900 mb-1 line-clamp-1 group-hover:text-black transition-colors duration-300">
                                    {product.name}
                                </h2>
                                <p className="text-sm font-semibold text-black">
                                    {formatPrice(product.harga)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-600">No products found</p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
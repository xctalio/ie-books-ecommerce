"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

const Navbar = () => {
  const router = useRouter();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    console.log("Search term changed:", searchTerm);
    
    if (searchTerm.trim()) {
      router.push(`/search?searchTerm=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <nav className="px-4 md:px-12 py-4 md:py-6 bg-white text-black">
      <div className="flex justify-between items-center">
        <Link
          href={"/"}
          className="hidden md:inline-block text-lg font-semibold"
        >
          Mindvest
        </Link>
        <div className="relative max-w-[300px] md:w-[400px]">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>

          <input
            type="text"
            onChange={handleChange}
            className="h-[36px] relative pl-10 border-[1px] border-black/[0.7] text-sm rounded-[8px] w-full py-2 px-3 focus:outline-none bg-transparent"
            placeholder="Search products..."
          />
        </div>

        <Link href={"/add-product"}>
          <Button>Add Products</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

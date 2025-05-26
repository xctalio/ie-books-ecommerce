import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="min-h-[70vh] md:min-h-[60vh] lg:min-h-[90vh] flex flex-col md:flex-row justify-center items-center bg-white px-4 md:px-12 text-black ml-10">
      <div className="max-w-2xl">
        <h1 className="text-5xl pt-6 md:pt-0 md:text-7xl leading-tight font-semibold">
          Grow your Mindset
        </h1>
        <p className="text-gray-600">
          Siap untuk membuka potensi tak terbatas? Kembangkan mindset Anda
          bersama kami hari ini!
        </p>

        <Link href="#product">
          <Button className="mt-5">Shop the E-Books</Button>
        </Link>
      </div>

      <div>
        <Image src="/growth-mindset.png" alt="img" width={400} height={400} />
      </div>
    </div>
  );
};

export default Hero;

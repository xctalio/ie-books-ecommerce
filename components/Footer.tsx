import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-6 px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm text-gray-500 font-light">
          &copy; {new Date().getFullYear()} Mindvest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

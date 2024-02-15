// Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 fixed bottom-0 w-full">
      <div className="flex justify-center space-x-4">
        <a
          href="#"
          className="text-xl hover:text-gray-400 transition duration-300"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="#"
          className="text-xl hover:text-gray-400 transition duration-300"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="#"
          className="text-xl hover:text-gray-400 transition duration-300"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="#"
          className="text-xl hover:text-gray-400 transition duration-300"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="#"
          className="text-xl hover:text-gray-400 transition duration-300"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
      <p className="text-center mt-4">
        © 2024 Baxter International Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

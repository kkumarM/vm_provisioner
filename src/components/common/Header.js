import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-3 fixed top-0 w-full mx-auto">
      <div className="flex justify-center">
        <h1 className="text-xl font-bold">
          VM Provisioning Tool <br />{" "}
          <span className="text-xs font-light">
            An Atuomated Platform for VM Provisioning
          </span>
        </h1>
        {/* <div>
          <ul className="flex items-center ">
            <li className="mx-3">contact us</li>
            <li className="mx-3">About</li>
            <li className="mx-3">login</li>
          </ul>
        </div> */}
      </div>
    </header>
  );
};

export default Header;

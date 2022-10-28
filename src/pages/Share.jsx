import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { LoginContext } from "../contexts/LoginContext";

import ProductCard from "../components/ProductCard";

const Share = () => {
  function navigateLand() {
    window.open("/lend", "_blank");
  }

  // const { account, loginStatus } = useContext(LoginContext);
  const [type, setType] = useState();
  const [prods, setProds] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tool", {
        params: {
          type: type,
          sold: false,
        },
      })
      .then((response) => {
        setProds(response.data.savedTools);
      });
  }, [type]);

  const tools = [
    "All",
    "Tractors",
    "Harvestor",
    "Plough",
    "Ripper Machine",
    "Thresher",
    "Seed Drill",
  ];

  return (
    <>
      <div className="grid md:grid-cols-7 sm:grid-cols-3 xs:grid-cols-2 gap-2 mx-2 mb-10 mt-5">
        {tools.map((tool, index) => (
          <button
            key={index}
            onClick={() => (tool === "All" ? setType() : setType(tool))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            {tool}
          </button>
        ))}
      </div>

      <div className="w-full sm:right-0 sm:w-20 bottom-0 my-10 fixed">
        <button
          className="w-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br text-white font-bold text-2xl py-2 rounded-full"
          onClick={navigateLand}
        >
          +
        </button>
      </div>

      <div class="px-2 pb-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 my-2 mx-2">
        {prods.map((prod, index) => (
          <ProductCard
            className="px-5 w-60 h-100"
            key={index}
            owner={prod._id}
            type={prod.type}
            description={prod.description}
            file={prod.file}
            price={prod.price}
            id={prod._id}
          />
        ))}
      </div>
    </>
  );
};

export default Share;

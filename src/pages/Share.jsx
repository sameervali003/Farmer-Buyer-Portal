import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { LoginContext } from "../contexts/LoginContext";
import { states, s_a } from "../utils/cities";
import ProductCard from "../components/ProductCard";

const Share = () => {
  function navigateLand() {
    window.open("/lend", "_blank");
  }

  // const { account, loginStatus } = useContext(LoginContext);
  const [type, setType] = useState();
  const [prods, setProds] = useState([]);
  const [myState, setMyState] = useState("");
  const [myCity, setMyCity] = useState();

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setProds([])
    axios
      .get("/api/tool", {
        params: {
          type: type
        }
      })
      .then((response) => {
        const savedTools = response.data.savedTools;
        let filteredTools = [];
        if (myCity !== undefined) {
          if (savedTools.length === 0) {
            console.log("No tools found")
            setLoading(false)
          } 
          savedTools.forEach((tool, index) => {
          axios
            .get("/api/user", {
              params: {
                _id: tool.owner,
              },
            })
            .then((response) => {
              const user = response.data.savedUser;
              const city = user.city;
              if (city === myCity) {
                filteredTools.push(tool);
              }
              if (index === savedTools.length - 1) {
                setProds(filteredTools);
                setLoading(false)
              }
            })
            .catch((err) => console.log(err));
        })
       } else { 
        setProds(savedTools)
        setLoading(false)
       }
    }) 
  }, [type, myCity]);

  const tools = [
    "All",
    "Tractors",
    "Harvestor",
    "Plough",
    "Ripper Machine",
    "Thresher",
    "Seed Drill",
  ];

  return !loading ? (
    <>
    <div className="bg-gradient-to-l from-teal-100 via-violet-100 to-lime-200">
      <div className="grid grid-cols-7  gap-2 mx-2 mb-2 mt-5 ">
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
      </div>

      <div className=" grid xs:grid-cols-2 grid-cols-1 gap-4 mx-2 mb-6">
        <div>
          <label className="mt-4 font-mono block">State</label>
          <select
            className="border-2 border-gray-300 p-2 rounded-lg mt-4 w-full"
            defaultValue={myState}
            onChange={(e) => setMyState(e.target.value)}
          >
            {states.map((state, index) => (
              <option key={index} value={state}>
                {" "}
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mt-4 font-sans block">My City</label>
          <select
            className="border-2 border-gray-300 p-2 rounded-lg mt-4 w-full"
            defaultValue={myCity}
            onChange={(e) => setMyCity(e.target.value)}
          > 
            {s_a[states.indexOf(myState)].map((city, index) => (
              <option key={index} value={city}>
                {" "}
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-2 pb-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 my-2 mx-2">
        {prods.length === 0 ? <h1>No tools here!!!</h1> : prods.map((prod, index) => (
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
  ) : (<h1>Loading...</h1>);
};

export default Share;

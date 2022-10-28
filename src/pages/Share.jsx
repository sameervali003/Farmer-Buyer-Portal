import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { LoginContext } from "../contexts/LoginContext";
import {states , s_a} from '../utils/cities'
import ProductCard from "../components/ProductCard";

const Share = () => {
  function navigateLand() {
    window.open("/lend", "_blank");
  }
  
  // const { account, loginStatus } = useContext(LoginContext);
  const [type, setType] = useState();
  const [prods, setProds] = useState([]);
  const [myState, setMyState ] = useState("")
  const [myCity, setMyCity ] = useState()

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
      <div className="grid grid-cols-7  gap-2 mx-2 mb-2 mt-5">
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

<div className=" grid xs:grid-cols-2 grid-cols-1 gap-4 mx-2">
<div>
<label className="mt-4 font-mono block">State</label>
<select className="border-2 border-gray-300 p-2 rounded-lg mt-4 w-full" defaultValue={myState} onChange={(e) => setMyState(e.target.value)}>
                {
                  states.map( (state, index)=>(
                   <option key={index} value={state}> {state}</option>
                     ))
                }
                </select>
</div>
<div>
<label className="mt-4 font-sans block">My City</label>
<select className="border-2 border-gray-300 p-2 rounded-lg mt-4 w-full" defaultValue={myCity} onChange={(e) => setMyCity(e.target.value)}>
                { 
                  s_a[states.indexOf(myState)].map( (city, index)=>(
                   <option key={index} value={city}> {city}</option>
                     ))
                }
                </select>
</div>



</div>

<button type="button" className="block mx-auto text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 mt-2 mb-4 py-2 px-4 rounded">
  Filter
</button>
      
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

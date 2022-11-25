import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { states, s_a } from "../utils/cities";
import CropCard from "../components/CropCard";
import Loading from '../components/Loading';

const Sell = () => {
  function navigateLand() {
    window.open("/lend2", "_blank");
  }

  // const { account, loginStatus } = useContext(LoginContext);
  const [type, setType] = useState();
  const [harvest, setHarvest] = useState([]);
  const [myState, setMyState] = useState("");
  const [myCity, setMyCity] = useState();

  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true)
    setHarvest([])
    axios
      .get("/api/crop", {
        params: {
          type: type
        }
      })
      .then((response) => {
        const savedCrops = response.data.savedCrops;
        
        let filteredCrops = [];
        if (myCity !== undefined) {
          if (savedCrops.length === 0) {
            console.log("No crops found")
            setLoading(false)
          } 
          savedCrops.forEach((crop, index) => {
          axios
            .get("/api/user", {
              params: {
                _id: crop.owner,
              },
            })
            .then((response) => {
              const user = response.data.savedUser;
              const city = user.city;
              if (city === myCity) {
                filteredCrops.push(crop);
              }
              if (index === savedCrops.length - 1) {
                setHarvest(filteredCrops);
                setLoading(false)
              }
            })
            .catch((err) => console.log(err));
        })
       } else { 
        setHarvest(savedCrops)
        setLoading(false)
       }
    }) 
  }, [type, myCity]);

  const crops = [
    "All",
    "Wheat",
    "Rice",
    "SugarCane",
    "Maize",
    "Jower",
    "Bajra",
    "Corn",
    "Red gram",
    "Cotton",
    "Soybean",
    "Groundnut",
    "Millets",
    "Jute"
  ]


  return !loading ? (
    <>
   
    <div className="">
      <div className="grid 2sm:grid-cols-7 grid-cols-3 gap-2 mx-2 mb-2 mt-5 ">
        {crops.map((crop, index) => (
          <button
            key={index}
            onClick={() => (crop === "All" ? setType() : setType(crop))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            {crop}
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
          <label className="mt-4 font-mono block">My City</label>
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

      <div className="px-2 pb-2 grid md:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-2 my-2 mx-2">
        {harvest.length === 0 ? <h1>No crops here!!!</h1> : harvest.map((harvest, index) => (
          <CropCard
            className="px-5 w-60 h-100"
            key={index}
            owner={harvest._id}
            type={harvest.type}
            description={harvest.description}
            file={harvest.file}
            price={harvest.price}
            id={harvest._id}
          />
        ))}
      </div>
    
    </>
  ) : (<Loading />);
};

export default Sell;

import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { LoginContext } from "../contexts/LoginContext";

const Lend2 = () => {
  var crops = 
  [
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
    "Jute",
    "Coffee"
  ]

  const [uid, setUid] = useState()
 
  const { account, loginStatus } = useContext(LoginContext);

  useEffect(() => {
    if (loginStatus && account) {
            axios.get("/api/user", {
                params: {
                    number: Number(account.substring(3))
                }
            }).then((response) => {
                setUid(response.data.savedUser._id)
            })
    }
  }, [loginStatus, account])

  return uid ? (
    <>
      <div className="mt-10 ml-5 mr-5">
        <h1 className="block mb-2 text-sm font-medium text-gray-900">
         Crop Lending Form
        </h1>
        <form action="/api/crop" method="post" encType="multipart/form-data">
            <input type="text" name="owner" value={uid} readOnly className="hidden"/>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Crop Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text" name="name"
              placeholder="Enter your Crop Name"
            />

            <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 ">
              Select your Crop from the list below
            </label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="type">
              {crops.map((crop, index) => (
                <option key={index} value={crop}>
                  {" "}
                  {crop}
                </option>
              ))}
            </select>

            <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 ">
              Crop Description
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your Crop Description" name="description"
            ></textarea>

            <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 ">
                Crop cost per acre
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text" name="price"
              placeholder="Enter your Crop cost per acre"
            />

            <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 ">
              Crop Image
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="file" name="file"
              placeholder="Enter your Crop Image"
            />

            <button
              className=" w-1/6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  ) : (<h1>Login First!!</h1>)
} 
export default Lend2;

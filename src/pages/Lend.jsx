import React from "react";

const Lend = () => {

    var products = new Array("Tractors", "Harvestor" , "plough" , "Ripper Machine" , "Thresher" , "sead drill");

    return (


        <>
        <div className="mt-10 ml-5 mr-5">
            <h1 className="block mb-2 text-sm font-medium text-gray-900">Lending Form</h1>
            <form >
                <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Product Name</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" placeholder="Enter your Product Name" />
                    
                    <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 ">Select your product from the list below</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {
                    products.map( (product, index)=>(
                    <option key={index} value={product}> {product}</option>
                     ))
                    }
                    </select>

                    <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 ">Product Description</label>
                    <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your Product Description" ></textarea>

                    <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 ">Product Rent per week</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" placeholder="Enter your Product Cost" />

                    <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 ">Product Image</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="file" placeholder="Enter your Product Image" />

                    <button className=" w-1/6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" type="submit">Submit</button>



                </div>
                 

                

            </form>
        </div>
        </>
    );
}
export default Lend;
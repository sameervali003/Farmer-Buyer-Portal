import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
const Share = () => {
  const navigate = useNavigate();

  function navigateLand() {
    navigate("/lend");
};

    return (
      <>
        <div className="grid grid-cols-7 gap-2  mx-2 mb-10 mt-5"> 
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">
         All
        </button>
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-14">
             Tractors
        </button>
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-14">
             Harvestor
        </button>
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-14">
             Plough
        </button>
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-14">
            Ripper
        </button>
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-14">
            Thresher
        </button>
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-14">
            seed drill
        </button>
        </div>
        <div className="w-20 h-20   right-0 bottom-0 my-10 mx-12 fixed"> 
        <button className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br text-white font-bold py-2 px-4 rounded-full" onClick={navigateLand}>+</button>
        </div>
        <div className="grid lg:grid-cols-2  sm:grid-cols-4 gap-2 mt-2 mx-2 mb-2 ">
        <div class="px-2 pb-2">
            <ProductCard className="px-5 w-60 h-100"> </ProductCard>
        </div>
        <div class="px-2 pb-2">
            <ProductCard className="px-5 w-60 h-100"> </ProductCard>
        </div>
        <div class="px-2 pb-2">
            <ProductCard className="px-5 w-60 h-100"> </ProductCard>
        </div>
        <div class="px-2 pb-2">
            <ProductCard className="px-5 w-60 h-100"> </ProductCard>
        </div>
        <div class="px-2 pb-2">
            <ProductCard className="px-5 w-60 h-100"> </ProductCard>
        </div>
        

        </div>
        
      </>
    );
  };
  
export default Share;
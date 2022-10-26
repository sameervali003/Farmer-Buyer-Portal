import React from "react";

const ProductCard = () => {
    return (
        <div class=" max-w-xs  bg-white rounded-lg shadow-md dark:bg-gray-400 dark:border-gray-700">
        <img class="rounded-t-lg" src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
    <div class="px-2 pb-2">
            <h5 class=" py-2 text-sm font-semibold tracking-tight text-gray-900 dark:text-white">Tool Name</h5>
            <h5 class=" text-sm font-semibold tracking-tight text-gray-900 dark:text-white">Description</h5>
        <div class="flex justify-between items-center">
            <span class="text-sm font-bold text-gray-900 dark:text-white">$cost</span>
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Borrow</button>
        </div>
    </div>
</div>
        
    );
}


export default ProductCard;
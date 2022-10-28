import { useContext } from "react";
import axios from "axios";
import { LoginContext } from "../contexts/LoginContext";

const ProductCard = ({ description, type, owner, file, price, id }) => {
    
    const blob = new Blob([Int8Array.from(file.data.data)], {type: file.contentType});
    const image = window.URL.createObjectURL(blob);

    const { account, loginStatus } = useContext(LoginContext);

    // function borrow() {
    //     if (!loginStatus) {
    //         return alert("Please login to continue")
    //     }
    //     const number = Number(account.substring(3))
    //     axios.get("/api/user", {
    //         params: {
    //             number: number
    //         }
    //     }).then((response) => {
    //         const user = response.data.savedUser
    //         const data = {
    //             buyer: user._id,
    //             product: id
    //         }
    //         console.log(data)
    //         axios.post("/api/order", data).then((response) => {
    //             console.log(response)
    //             window.location.reload(false)
    //         }).catch((error) => console.log(error))
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }

    function borrow () {
        window.open(`/tool/${id}`,'_blank')
    }

    return (
        <div className=" max-w-xs  bg-white rounded-lg shadow-md dark:bg-gray-400 dark:border-gray-700">
        <img className="rounded-t-lg" src={image} alt="" />
        <div className="px-2 pb-2">
            <h5 className=" py-2 text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{type}</h5>
            <h5 className=" text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{description}</h5>
        <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900 dark:text-white">&#x20B9;{" "+price}</span>
            <button type="button" onClick={borrow} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Borrow</button>
        </div>
    </div>
</div>
        
    ) ;
}


export default ProductCard;
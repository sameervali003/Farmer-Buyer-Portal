import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import axios from 'axios'

const DeleteCrop = ({ description, type, owner, file, price, id }) => {
    const { account, loginStatus } = useContext(LoginContext);

    const blob = new Blob([Int8Array.from(file.data.data)], {type: file.contentType});
    const image = window.URL.createObjectURL(blob);

    function deleteCrop() {
        axios.delete('/api/crop', {params: {_id: id}}).then((response) => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
        window.location.reload(false)
    }

    return (
        <div className=" max-w-xs  bg-white rounded-lg shadow-md dark:bg-gray-400 dark:border-gray-700">
        <img className="rounded-t-lg" src={image} alt="" />
        <div className="px-2 pb-2">
            <h5 className=" py-2 text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{type}</h5>
            <h5 className=" text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{description}</h5>
        <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900 dark:text-white">&#x20B9;{" "+price}</span>
            <button type="button" onClick={deleteCrop} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2 text-center mr-2 mb-2 ">Delete</button>
        </div>
    </div>
</div>
        
    ) ;
}


export default DeleteCrop;

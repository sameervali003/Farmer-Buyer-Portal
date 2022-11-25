const CropCard = ({ description, type, owner, file, price, id }) => {
    
    const blob = new Blob([Int8Array.from(file.data.data)], {type: file.contentType});
    const image = window.URL.createObjectURL(blob);

    function buy () {
        window.open(`/crop/${id}`,'_blank')
    }

    return (
        <div className=" max-w-xs  rounded-lg shadow-md bg-slate-50">
        <img className="rounded-t-lg" src={image} alt="" />
        <div className="px-2 pb-2">
            <h5 className=" py-2 text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{type}</h5>
            <h5 className=" text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{description}</h5>
        <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900 dark:text-white">&#x20B9;{" "+price}</span>
            <button type="button" onClick={buy} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy</button>
        </div>
    </div>
</div>
        
    ) ;
}


export default CropCard;
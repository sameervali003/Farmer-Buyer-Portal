import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

const Crop = () => {
    const { id } = useParams();

    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
      .get("/api/crop", {
        params: {
          _id: id
        },
      })
      .then((response) => {
        const crop = response.data.savedCrops[0]
        console.log(JSON.stringify(crop))
        const { type, description, file, price, owner } = crop;
        const info = {
            type, description, file, price, owner
        }
        axios.get('/api/user', {
            params: {
                _id: owner
            }
        }).then((res) => {
            info.number = res.data.savedUser.number
            setDetails(info)
            setLoading(false)
        }).catch(err => console.log(err))

        console.log(crop);
      }).catch((error) => console.log(error));
    }, [])

    return !loading ? (
        <>
        
        <div className="sm:w-2/3 w-full bg-white rounded-lg shadow-md dark:bg-gray-400 dark:border-gray-700 mx-auto mt-10">
            <img className="rounded-t-lg" src={window.URL.createObjectURL(new Blob([Int8Array.from(details.file.data.data)], {type: details.file.contentType}))} alt="" /> 
        
        <div className="px-2 pb-2">
            <h1 className=" py-2 text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{details.type}</h1>
            <h1 className=" text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{details.description}</h1>
            <h1 className=" text-sm font-semibold tracking-tight text-gray-900 dark:text-white">&#x20B9;{" "+details.price}</h1>
            <h1 className=" text-sm font-semibold tracking-tight text-gray-900 dark:text-white">Owner: {details.number}</h1>
  
        </div>
</div>
</>
    ) : <Loading/>;
}

export default Crop
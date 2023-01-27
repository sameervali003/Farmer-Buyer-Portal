import axios from 'axios';
import { useContext, useState, useEffect } from 'react'
import DeleteCrop from "../components/DeleteCrop";
import { LoginContext } from "../contexts/LoginContext";
import Loading from '../components/Loading';


function MyCrops() {

    const { account, loginStatus } = useContext(LoginContext);
    const [crops, setCrops] = useState([])
    const [loading, setLoading] = useState(true)
 
    useEffect(() => {
        if (loginStatus) {
            setLoading(true)
            setCrops([])
            axios.get('/api/user', {
                params: {
                    number: account.substring(3)
                }
            }).then((response) => {
                const id = response.data.savedUser._id
                axios.get('/api/crop', {
                    params: {
                        owner: id
                    }
                }).then((response) => {
                    const savedCrops = response.data.savedCrops
                    const newCrops = []
                    savedCrops.forEach((crop) => {
                        newCrops.push({
                            description: crop.description,
                            type: crop.type,
                            file: crop.file,
                            price: crop.price,
                            _id: crop._id
                        })
                    })
                    setCrops(newCrops)
                    setLoading(false)
                }).catch(err => {
                    console.log(err)
                    setLoading(false)
                })
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
        }
    }, [loginStatus])

    return !loading ? (
        <>
        <h1 className='text-2xl font-bold m-5'>My Crops</h1>
        <div className="grid sm:grid-cols-3 grid-cols-1 xs:grid-cols-2 gap-2 m-5">
         {crops.map((crop, index) => 
            <DeleteCrop key={index} id={crop._id} description={crop.description} type={crop.type} file={crop.file} price={crop.price}/>
        )}
        </div>
        </>
    ) : (<Loading/>)
    }

export default MyCrops
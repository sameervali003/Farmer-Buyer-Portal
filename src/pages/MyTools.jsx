import axios from 'axios';
import { useContext, useState, useEffect } from 'react'
import DeleteCard from "../components/DeleteCard";
import { LoginContext } from "../contexts/LoginContext";
import Loading from '../components/Loading';


function MyTools() {

    const { account, loginStatus } = useContext(LoginContext);
    const [tools, setTools] = useState([])
    const [loading, setLoading] = useState(true)
 
    useEffect(() => {
        if (loginStatus) {
            setLoading(true)
            setTools([])
            axios.get('/api/user', {
                params: {
                    number: account.substring(3)
                }
            }).then((response) => {
                const id = response.data.savedUser._id
                axios.get('/api/tool', {
                    params: {
                        owner: id
                    }
                }).then((response) => {
                    const savedTools = response.data.savedTools
                    const newTools = []
                    savedTools.forEach((tool) => {
                        newTools.push({
                            description: tool.description,
                            type: tool.type,
                            file: tool.file,
                            price: tool.price,
                            _id: tool._id
                        })
                    })
                    setTools(newTools)
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
        <h1 className='text-2xl font-bold m-5'>My Tools</h1>
        <div className="grid sm:grid-cols-3 grid-cols-1 xs:grid-cols-2 gap-2 m-5">
         {tools.map((tool, index) => 
            <DeleteCard key={index} id={tool._id} description={tool.description} type={tool.type} file={tool.file} price={tool.price}/>
        )}
        </div>
        </>
    ) : (<Loading/>)
    }

export default MyTools
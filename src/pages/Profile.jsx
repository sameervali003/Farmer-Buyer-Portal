import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "../contexts/LoginContext";
import {states , s_a} from '../utils/cities.js'

function Profile() {
    const navigate = useNavigate()
    const { account, setLoginStatus, loginStatus } = useContext(LoginContext);

    const [myState, setMyState ] = useState("")
    const [myCity, setMyCity ] = useState()
    const [loading, setLoading] = useState(true)

    

    useEffect(() => {
      if (loginStatus) {
        const number = Number(account.substring(3));
        axios.get('/api/user', { params: { number: number } })
        .then((res) => {
          console.log(res.data)
          const { city, state } = res.data.savedUser
          if (city && state) {
            setMyCity(city)
            setMyState(state)
            console.log(myCity)
          } else {
            setMyState("")
          }
          setLoading(false)
        }, (error) => {
          setMyState("")
          console.log(error)
          setLoading(false)
        }
        )}
    }, [account, loginStatus])

    function locationChange() {
      if (loginStatus && (myCity && myState) && (myCity !== '' || myState !== '')) {
        axios.put('/api/user', { number: Number(account.substring(3)), city: myCity, state: myState })
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
      } else {
        alert("Please provide valid input!")
      }
    }

    return !loading && loginStatus ? (
    <>
    <div className="mt-10 mx-10">
        <h1 className='font-serif text-base'> Login Information </h1>
        <form>
            <div className="flex flex-col">
             
                <label className="mt-4">Phone Number</label>
                <input className="border-2 border-gray-300 p-2 rounded-lg" type="text" value={account} disabled/>

                <label className="mt-4 font-mono">Your State</label>
                <select className="border-2 border-gray-300 p-2 rounded-lg mt-4" defaultValue={myState} onChange={(e) => setMyState(e.target.value)}>
                {
                  states.map( (state, index)=>(
                   <option key={index} value={state}> {state}</option>
                     ))
                }
                </select>
                
                <label className="mt-4 font-mono">Your City</label>
                <select className="border-2 border-gray-300 p-2 rounded-lg mt-4" defaultValue={myCity} onChange={(e) => setMyCity(e.target.value)}>
                { 
                  s_a[states.indexOf(myState)].map( (city, index)=>(
                   <option key={index} value={city}> {city}</option>
                     ))
                }
                </select>

                <button className="w-full sm:w-1/3 bg-blue-500 text-white px-4 py-2 rounded font-medium mt-6" type="button" onClick={locationChange}>Update Location</button>

                <button className="w-full sm:w-1/3 py-2 my-4 rounded-lg bg-green-400 to-blue-500 hover:bg-green-500" onClick={() => {
                    localStorage.removeItem("loginStatus")
                    localStorage.removeItem("account")
                    setLoginStatus(false)
                    navigate('/')
                }}>Logout</button>
                
            </div>
        </form>
    </div>
    </>
  ): (<h1>Loading!!!</h1>)
}

export default Profile
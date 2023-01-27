import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from "../contexts/LoginContext";

const DropdownButton = () => {

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const { setLoginStatus, loginStatus } = useContext(LoginContext);

  function logout() {
    localStorage.removeItem("loginStatus")
    localStorage.removeItem("account")
    setLoginStatus(false)
    window.location.reload(false)
  }

  return (
    <>
      <div className="text-left">
        <div>
          <button 
            type="button"
            onClick={() => setOpen(!open)}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
          >
            Hello!
            <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>
        </div>

        {open && 
          <div className="block md:fixed md:right-10 w-40 h-38 bg-white mt-2">
        <ul aria-labelledby="dropdownDefault" className="py-1 text-sm text-black rounded">
            <li className='block py-2 px-4 hover:bg-gray-600' onClick={() => navigate("/profile")}>Profile</li>
            <li className='block py-2 px-4 hover:bg-gray-600' onClick={() => navigate("/mytools")}>My Tools</li>
            <li className='block py-2 px-4 hover:bg-gray-600' onClick={() => navigate("/mycrops")}>My Crops</li>
            <li className='block py-2 px-4 hover:bg-gray-600' onClick={logout}>Sign out</li>
        </ul>

        </div>
          }


</>

  )
}

export default DropdownButton
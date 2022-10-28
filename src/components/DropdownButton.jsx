import { useState } from 'react'

const DropdownButton = (props) => {

  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="text-left">
        <div>
          <button 
            type="button"
            onClick={() => setOpen(!open)}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
          >
            {props.children}
            <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>
        </div>

        {open && 
          <div className="block md:fixed md:right-10 w-40 h-40 bg-black mt-2">
        <ul aria-labelledby="dropdownDefault" className="py-1 text-sm text-white rounded">
            <li className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600'>Profile</li>
            <li className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600'>My orders</li>
            <li className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600'>Sign out</li>
        </ul>

        </div>
          }


</>

  )
}

export default DropdownButton
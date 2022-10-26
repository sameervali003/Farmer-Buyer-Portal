import React from 'react'

function Detect() {
  return (

       <div className='my-4 mx-5'>
       <form action="/predict" method="POST" enctype="multipart/form-data">
       <label className="block mb-4 text-sm font-medium text-white-900" for="file_input">Upload file</label>
        <input className="block w-1/5 text-lg rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600" id="inputImage" type="file" name="file"></input>
        <button className='w-20 py-2 my-4 rounded-lg bg-green-400 to-blue-500 hover:bg-green-500' type="submit">Detect</button>

       </form>
       </div>
          
  )
}

export default Detect
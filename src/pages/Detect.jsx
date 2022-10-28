import React , {useState} from 'react'


function Detect() {
  const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  return (
    <>
    <div className="w-full h-screen bg-[url('https://img.freepik.com/premium-vector/realistic-background-with-green-tea-leaves-flying-wind-nature-fresh-effect-with-herbal-leaf-air-organic-tea-plantation-vector-banner-foliage-motion-falling-down-blowing-wind_102902-4858.jpg?w=2000')] bg-cover flex items-center mt-[-78px]">
      
    </div>
    

       <div className='mt-5 ml-5 mr-5'>
       <form action="/predict" method="POST" enctype="multipart/form-data">
        <label className="block mb-4 text-sm font-medium text-white-900" for="file_input">Upload file for detecting planting Disease</label>
        <input id="inputImage" type="file" name="file" onChange={handleChange} className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" /> 
        <img  className=" rounded-md my-4" src={file}></img> 
        <button className='w-20 py-2 my-4 rounded-lg bg-lime-300' type="submit">Detect</button>  
       </form>
       </div>
     </>
          
  )
}

export default Detect
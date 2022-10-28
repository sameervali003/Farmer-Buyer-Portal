import React from 'react'
import pic2 from "../assets/pic2.jpg";
import DropdownButton from '../components/DropdownButton';

function About() {
  return (
    
    <div className="my-36 mx-96 ">    
      <a href="#" class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100">
      <img class="object-cover w-full  rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={pic2} alt=""/>
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">About FarmEasy</h5>
        <p class="mb-3 font-normal text-gray-700">Food security for billions of people on earth requires minimizing crop damage by timely detection of diseases.Developing methods for detection of plant diseases serves the dual purpose of increasing crop yield and reducing pesticide use without knowing about the proper disease. Along with development of better crop varieties, disease detection is thus paramount goal for achieving food security.</p>
      </div>
      </a>

    </div>
    


  )
}

export default About
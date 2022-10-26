import React from 'react'

const Button = (props) => {
  return (
    <button className='bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-400 
    duration-500' onClick={props.func}>
      {props.children}
    </button>
  )
}

export default Button
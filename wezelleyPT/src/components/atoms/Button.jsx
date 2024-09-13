import React from 'react'

function Button({label}) {
  return (
    <button className='border p-4 bg-purple-400 text-white rounded-full font-bold'>
        {label}
    </button>
  )
}

export default Button
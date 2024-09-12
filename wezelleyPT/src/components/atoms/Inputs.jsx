import React from 'react'

function Inputs({type, cutomClass = null ,label = null, placeHolder = null, name = null, id = null, value = null }) {
    const Inputs = {
        text: cutomClass,
        number: '',
        checkbox: "mr-2 h-5 w-5 appearance-none rounded-md border border-gray-300 checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')] checked:bg-center checked:bg-no-repeat hover:border-indigo-500 hover:bg-indigo-100",
        date: new Date(),
        password: '',
        email: '',
    }
  return (
    <div className="flex items-center">
        <input id={id} type={type} value={value} name={name} placeholder={placeHolder} className={`${Inputs[type]}`}/>
        {label && <label for={id} class="cursor-pointer text-xs font-normal leading-4 text-gray-600">{label}</label>}
    </div>
  )
}

export default Inputs
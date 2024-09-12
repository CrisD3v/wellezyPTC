import React from 'react'

function Select({ type, options, selectedOPT }) {
    const types = {
        rounded: 'relative block h-12 w-full appearance-none rounded-full border border-gray-300 bg-white px-4 py-2.5 text-xs font-medium text-gray-900 focus:outline-none',
        normal: 'relative block h-12 w-full appearance-none border border-gray-300 bg-white px-4 py-2.5 text-xs font-medium text-gray-900 focus:outline-none'
    }
    return (
        <div className="relative mb-7 w-full">
            <select className={`${types[type]}`}>
                <option className={`${types[type]}`} selected disabled>{selectedOPT}</option>
                {options.map((option, index) => (
                    <option className={`${types[type]}`} key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <svg class="absolute right-4 top-1/2 z-50 -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
    )
}

export default Select
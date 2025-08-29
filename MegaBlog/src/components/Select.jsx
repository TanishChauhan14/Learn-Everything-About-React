import React, { useId } from 'react'

const Select = React.forwardRef( function Select ({
    options,
    lable,
    className = "",
    ...props
},ref){
    const Id = useId()
  return (
    <div className="w-full">
        {lable && <lable htmlFor={Id} className=" ">
        </lable>}
        <select {...props} id={Id} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`} ref={ref}>
        {options?.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
        </select>
    </div>
  )
})

export default Select

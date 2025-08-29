import React, { useId } from "react"


const Input = React.forwardRef(function Input ({
    lable,
    type = "text",
    classname = "",
    ...props
},ref){
    const Id = useId()
  return (
    <div className="w-full">
        {lable && 
        <label className=" inline-block pl-1 mb-1" >
            {lable}
        </label>}
        <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname} `} {...props} id={Id} ref={ref}/>
      
    </div>
  )
})

export default Input

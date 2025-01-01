import React, { useContext } from 'react'
import { FaMicrophone } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { Context } from '../../context/Context';

const Footer = () => {

    const {
        onSent,
        input,
        setInput
    } =useContext(Context)

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevent default form submission behavior
          onSent(); // Call your function
        }
      };

    return (
        <div className="flex justify-center relative w-full sm:w-4/5 mx-auto p-8">
            <input
                className="border-2 rounded-full w-full h-12 pl-4 pr-10"
                type="text"
                placeholder="       Ask Gemini"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <IoMdSend  
                className="text-xl absolute top-1/2 right-14 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={onSent}
            />

        </div>

    )
}

export default Footer

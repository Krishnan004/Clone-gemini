import React, { useContext } from 'react'
import { FaMicrophone } from "react-icons/fa6";
import { RiImageAddLine } from "react-icons/ri";
import { Context } from '../../context/Context';

const Footer = () => {

    const {
        onSent,
        input,
        setInput
    } =useContext(Context)

    return (
        <div className="flex justify-center relative w-full sm:w-4/5 mx-auto p-8">
            <input
                className="border-2 rounded-full w-full h-12 pl-4 pr-10"
                type="text"
                placeholder="       Ask Gemini"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
            />
            <RiImageAddLine 
                className="text-xl absolute top-1/2 right-14 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={onSent}
            />

        </div>

    )
}

export default Footer

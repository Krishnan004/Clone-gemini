import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";


const SplitScreen = ({ left: Left, right: Right }) => {

    const [visible,setVisible]=useState(false);

    return (
        <div className="grid grid-cols-[auto,3fr] h-screen">
            {/* Left Section */}
            <div className={`sm:block ${visible? "block":"hidden"}`}>
                <Left />
            </div>
            {/* Right Section */}
            <div className="overflow-y-auto">
                <Right className="relative" />
                <IoMenu className=" absolute top-10 left-5 size-6 sm:hidden" onClick={()=>setVisible(!visible)}/>
            </div>
        </div>
    );
};

export default SplitScreen;

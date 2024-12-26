import React, { useState, useContext } from 'react'
import { IoMenu } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";
import { RiHistoryLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { Context } from '../../context/Context';
import { SlOptions } from "react-icons/sl";


const Sidebar = () => {

    const [visible, setVisible] = useState(true)
    const {UpdateChat,prevPrompt,showrecent,newChat,recent,deletChat} = useContext(Context)
    const [existingId,setExistingId] =useState();

    
    return (
        <>
            <div className={` h-screen bg-slate-100 grid grid-rows-[auto,1fr,auto] gap-4 p-4 px-6  `}>
                {/* Top Menu Section */}
                <div className="flex-col items-center gap-4 ">
                    <IoMenu className="nav-button mb-8 opacity-0 sm:opacity-100" onClick={() => setVisible(!visible)} />
                    <div className={`px-2  h-8 border border-2 rounded-full px-2 bg-gray-200 hover:bg-gray-300 text-gray-400 w-full max-w-32  ${visible? "animate-typing overflow-hidden": null }`}>
                        <span className="text-xl">+ </span>
                        {visible &&
                            <span 
                            onClick={() => {
                                if (existingId !== undefined) {
                                    UpdateChat(existingId);
                                    setExistingId(undefined); // Clear existingId after updating
                                } else {
                                    newChat();
                                }
                            }}
                            >New Chat</span>
                        }
                    </div>
                </div>

                {/*  Recent Chat Section */}
                        
                <div className={`flex flex-col gap-2 trasition-all duration-100 ${visible ? "w-60 opacity-100" : "w-0 opacity-0"}`}>

                    <h4 className="text-md font-semibold text-gray-700">Recent</h4>
                    {recent.length>0?(
                        recent.map((data,index)=>(
                    <div key={index} className="flex justify-between items-center hover:bg-gray-300 rounded-xl px-2 group/item " onClick={()=>{showrecent(index),setExistingId(index)}} >
                        <p className="   text-gray-700 cursor-pointer">
                            {data.prompt[0]}
                        </p>
                        <div className="relative group/edit hidden group-hover/item:block">
                            <SlOptions className=" hover:opacity-0" />
                            <button className="absolute right-0 top-0 hidden group-hover/edit:block rounded-xl bg-white px-4 " onClick={()=>deletChat(index)}>delete</button>
                        </div>
                    </div>
                    ))):(
                        <p>No recent items</p>
                    )}
                </div>
                    
                {/* Bottom Navigation Section */}
                <div className="flex flex-col gap-4 justify-between">
                    <div className="flex  items-center">
                        <IoHelpCircleOutline className="nav-button" />
                        {visible &&
                            <p className="text-sm text-gray-700">Help</p>
                        }
                    </div>
                    <div className="flex  items-center">
                        <RiHistoryLine className="nav-button" />
                        {visible &&
                            <p className="text-sm text-gray-700">History</p>
                        }
                    </div>
                    <div className="flex  items-center">
                        <IoSettingsOutline className="nav-button" />
                        {visible &&
                            <p className="text-sm text-gray-700">Settings</p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar

import React, { useContext } from 'react'
import { Context } from '../../context/Context';
import profile from "../../assets/profile.png"
import logo from "../../assets/gemini_logo.png"

const Content = () => {

    const {
        onSent,
        input,
        setInput,
        prevPrompt,
        setPrevPrompt,
        result,
        setResult,
        showResult,
        setShowResult,
        loading,
        setLoading,
        prompt,
        setPrompt
    } = useContext(Context)

    const Loading = () =>{
        return(
            <div className="flex flex-col gap-2 p-6">
            <img src={profile} className="size-6 rounded-full" alt="" />
                <img src={logo} className="size-6 rounded-full animate-ping" alt="" />
                <hr className="h-4  bg-gradient-to-r from-blue-300 via-white to-blue-300 animate-loading"/> 
                <hr className="h-4  bg-gradient-to-r from-blue-300 via-white to-blue-300 animate-loading" />
                <hr className="h-4 w-1/3 bg-gradient-to-r from-blue-300 via-white to-blue-300 animate-loading" />
            </div>
        )
    }

    if(loading){
        return <Loading/>;
    }


    return (
        <div className={`h-full flex flex-col py-4 sm:p-8 ${showResult ? null : "justify-center items-center"}`}>
            {showResult ? (
                prevPrompt.map((prompt,i)=>(
                <div key={i} className=" flex flex-col gap-4">
                    <div className="flex flex-col items-end gap-2">
                        <img src={profile} className="size-6 rounded-full" alt="" />
                        <p className="rounded-xl bg-slate-100 px-4">{prompt}</p>
                    </div>
                    <div className="flex gap-2">
                    <img src={logo} className="size-6 rounded-full" alt="" />
                    <p dangerouslySetInnerHTML={{__html:result[i]}} ></p>
                    </div>
                </div>
                ))
            ) : (
                    <>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-red-700 text-transparent bg-clip-text">
                        Hello Krishnan
                    </h1>
                    </>
                )}
        </div>


    )
}

export default Content

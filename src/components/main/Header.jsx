import React, { useContext } from 'react'
import profile from "../../assets/profile.png"
import { doSignInWithGoogle,doSignOut } from '../../firebase/auth';
import { Context } from '../../context/Context';


const Header = () => {

    const { currentUser } = useContext(Context)

    
    return (
        <div className="flex justify-between items-center h-12" >
            <div className="p-8 sm:p-2 rounded-xl hover:bg-slate-100">
                <h1 className="text-xl" >Gemini </h1>
                <p className="text-xs">1.5 Flash</p>
            </div>
            <div className="flex gap-4">
            <div>
                <button className=" p-2 rounded-xl bg-slate-100" onClick={()=>doSignOut()} >Sign out</button>
            </div>
            {/* <div>...</div> */}
            <div>
                <img className="size-10 rounded-full" onClick={()=>doSignInWithGoogle()} src={currentUser.photoURL} alt="Profile"/>
            </div>
            </div>
        </div>
    )
}

export default Header

import React from 'react';
import { doSignInWithGoogle } from '../../firebase/auth';

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
            <button
                onClick={doSignInWithGoogle}
                className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-800 rounded-lg transition-all duration-300"
            >
                Login with Google
            </button>
        </div>
    );
};

export default Login;

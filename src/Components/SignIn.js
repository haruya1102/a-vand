//SignIn.js

import React from 'react'
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from './Firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// サインイン画面
const SignIn = () => {

    const navigate = useNavigate();
    const onGoogleClick = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email
                });
            }
            navigate("/");
        } catch (error) {
            console.log("Error");
        }
    };

    return (
        <div className="min-h-screen bg-hero bg-cover bg-center">
            <div class="w-full min-h-screen flex  justify-center items-center backdrop-brightness-50">
                <div className='mx-auto max-w-screen-2xl px-4 md:px-8 flex flex-col items-center pt-8 pb-16 text-center lg:pt-32 lg:pb-48' >
                    <div >
                        <h1 className=" text-white text-black-800 mb-8 text-5xl font-bold sm:text-6xl md:mb-12 md:text-7xl" >A-VAND</h1>
                        <p className=' font-semibold text-gray-400 text-lg md:text-xl xl:text-2xl'>「A-VAND」は関西学院大学軽音サークル「AVANT-GARDE」専用のバンドメンバーマッチングアプリです。
                        </p>
                        <p className='break-words whitespace-pre-wrap mb-4 font-semibold text-gray-400 md:mb-6 md:text-lg xl:text-2xl'>
                            バンドに出たいけど、バンドメンバーに困っているあなたのためのアプリです。
                        </p>
                        <button onClick={onGoogleClick} type="button" class="text-white bg-accent hover:bg-accent/80 font-medium rounded-lg text-xl sm:text-2xl px-6 sm:px-8 py-4 text-center inline-flex items-center mr-2 mb-2">
                            <svg class="w-6 h-6 mr-5 -ml-3" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                            Googleでサインイン
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SignIn
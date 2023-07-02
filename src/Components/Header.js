import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from './Firebase';

// ヘッダー

const Header = () => {

    return (
        <header>
            <nav class=" bg-main px-4 lg:px-6 py-2 lg:py-6">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen">
                    <h1 class="flex items-center">
                        <Link to="/" class=" text-white self-center text-xl lg:text-3xl font-semibold whitespace-nowrap">A-VAND</Link>
                    </h1>
                    <div class="flex items-center lg:order-2 ">
                        <Link to="/mypage">
                            <img class=" inline-flex items-center m-2 w-10 lg:w-12 h-10 lg:h-12 rounded-full " src={auth.currentUser.photoURL} alt="Rounded avatar" />
                        </Link>
                        <button onClick={() => auth.signOut()} class="text-white  bg-accent hover:bg-accent/90 inline-flex items-center font-semibold rounded-lg text-sm lg:text-lg px-2 lg:px-3 py-3 lg:py-4 mr-2 " aria-controls="mobile-menu-2" aria-expanded="false">
                            <Link to="/sign-in" >サインアウト</Link>
                        </button>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Header
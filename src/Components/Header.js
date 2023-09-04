// Header.js

import React from 'react'
import { Link } from 'react-router-dom'

// ヘッダー

const Header = () => {

    return (
        <header>
            <nav class=" bg-main px-4 lg:px-6 py-2 lg:py-6">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen">
                    <h1 class="flex items-center">
                        <Link to="/" class=" text-white self-center text-xl lg:text-3xl font-semibold whitespace-nowrap">A-VAND</Link>
                    </h1>
                    <div class="flex items-center">
                        <Link to="/" class="text-white hover:text-white/75 text-sm lg:text-xl inline-flex items-center font-semibold mr-4 lg:mr-16">
                            ホーム
                        </Link>
                        <Link to="/user-list" class="text-white hover:text-white/75 text-sm lg:text-xl inline-flex items-center font-semibold mr-4 lg:mr-16" aria-controls="mobile-menu-2" aria-expanded="false">
                            ユーザーリスト
                        </Link>
                        <Link to="/my-page" class="text-white hover:text-white/75 text-sm lg:text-xl inline-flex items-center font-semibold">
                            マイページ
                        </Link>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Header
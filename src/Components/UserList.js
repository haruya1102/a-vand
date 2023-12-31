// UserList.js

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase';
import Header from './Header';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await getDocs(collection(db, 'users'));
            const userList = usersData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUsers(userList);
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <Header />
            <div class="w-screen lg:w-3/5 m-auto bg-main rounded-lg text-white mt-3 pb-3">
                <h2 class="text-3xl font-semibold py-6 pl-10">ユーザーリスト</h2>
                <ul class="pt-3 px-10">
                    {users.map((user) => (
                        <li key={user.id} class="border rounded-lg my-6 py-3">
                            <div class="flex justify-between">
                                <p class="text-2xl font-semibold pt-4 pb-4 pl-8">{user.name}</p>
                                <div class="pr-10 border-l pl-4">
                                    <p class="text-lg font-medium">{user.part}</p>
                                    <p class="pt-2 text-lg font-medium">{user.grade}</p>
                                </div>
                            </div>
                            <div class="flex pt-5 pl-8">
                                {user.url && (
                                    <button
                                        onClick={() => window.open(user.url, "_blank")}
                                        type="button"
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        class=" bg-instagram hover:bg-instagram/80 mb-2 mr-4 inline-block rounded-lg px-7 py-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </button>
                                )}
                                <Link to={`/chat/${user.id}`} class="bg-accent hover:bg-accent/80 mb-2 inline-block rounded-lg px-7 py-4 text-md font uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                                    チャットする
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default UserList;

import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './Firebase';
import Header from './Header';

const MyPage = () => {
    const [name, setName] = useState('');
    const [part, setPart] = useState('');
    const [grade, setGrade] = useState('');
    const [url, setUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedPart, setEditedPart] = useState('');
    const [editedGrade, setEditedGrade] = useState('');
    const [editedUrl, setEditedUrl] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, 'users', userId);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                setName(userData.name);
                setPart(userData.part);
                setGrade(userData.grade);
                setUrl(userData.url);
                setEditedName(userData.name);
                setEditedPart(userData.part);
                setEditedGrade(userData.grade);
                setEditedUrl(userData.url);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, 'users', userId);

        try {
            await updateDoc(userDocRef, {
                name: editedName,
                part: editedPart,
                grade: editedGrade,
                url: editedUrl
            });
            setName(editedName);
            setPart(editedPart);
            setGrade(editedGrade);
            setUrl(editedUrl);
            setIsEditing(false);
            console.log('User information updated successfully!');
        } catch (error) {
            console.error('Error updating user information:', error);
        }
    };

    const handleInstagramClick = () => {
        window.open(url, '_blank');
    };

    return (
        <div>
            <Header />
            <div class=" w-screen lg:w-3/5 m-auto bg-main rounded-lg text-white mt-3">
                <h2 class="text-3xl font-semibold py-6 pl-10">マイページ</h2>
                {isEditing ? (
                    <div class="flex flex-col px-10">
                        <p class="mx-3 text-lg font-semibold">名前</p>
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            class=" text-black mx-3 mb-3 rounded-lg px-2 py-1" />
                        <p class="mx-3 text-lg font-semibold">パート</p>
                        <select
                            value={editedPart}
                            onChange={(e) => setEditedPart(e.target.value)}
                            class=" text-black mx-3 mb-3 rounded-lg px-2 py-1"
                        >
                            <option value="">選択してください</option>
                            <option value="ボーカル">ボーカル</option>
                            <option value="ギターボーカル">ギターボーカル</option>
                            <option value="リードギター">リードギター</option>
                            <option value="ベース">ベース</option>
                            <option value="ドラム">ドラム</option>
                            <option value="キーボード">キーボード</option>
                        </select>
                        <p class="mx-3 text-lg font-semibold">学年</p>
                        <select
                            value={editedGrade}
                            onChange={(e) => setEditedGrade(e.target.value)}
                            class=" text-black mx-3 mb-3 rounded-lg px-2 py-1"
                        >
                            <option value="">選択してください</option>
                            <option value="1回生">1回生</option>
                            <option value="2回生">2回生</option>
                            <option value="3回生">3回生</option>
                            <option value="4回生">4回生</option>
                            <option value="留年生">留年生</option>
                        </select>
                        <p class="mx-3 text-lg font-semibold">Instagram URL</p>
                        <input
                            type="text"
                            value={editedUrl}
                            onChange={(e) => setEditedUrl(e.target.value)}
                            class=" text-black mx-3 mb-3 rounded-lg px-2 py-1"
                        />
                        <button onClick={handleSave} class="text-white  bg-accent hover:bg-accent/60 rounded-lg font-semibold text-xl px-7 py-3 my-3 mx-auto">更新</button>
                    </div>
                ) : (
                    <div class="flex flex-col">
                        <p class="mt-4 text-2xl font-semibold mx-10">{name}</p>
                        <p class="pt-4 text-lg font-medium border-b mx-10">{part}</p>
                        <p class="pt-4 text-lg font-medium border-b mx-10">{grade}</p>
                        <p class="pt-4 text-lg font-medium border-b mx-10">InstagramURL: {url}</p>
                        <div class="flex pt-5 pl-10">
                            <button
                                onClick={handleInstagramClick}
                                type="button"
                                name='instagram'
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                class=" bg-instagram hover:bg-instagram/80 inline-block rounded-lg my-4 px-5 mr-4 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </button>
                            <button onClick={handleEdit} class="bg-accent hover:bg-accent/80 rounded-lg font-semibold text-lg py-3 px-5 my-4">編集</button>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default MyPage;

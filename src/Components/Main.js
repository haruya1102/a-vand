//Main.js

import React, { useEffect, useState } from 'react';
import Header from './Header';
import { collection, addDoc, onSnapshot, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from './Firebase';
import { useNavigate } from 'react-router-dom';


// ホーム画面
const Main = () => {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [place, setPlace] = useState('');
    const [detail, setDetail] = useState('');
    const [newevent, setNewEvent] = useState(false);

    // イベント新規作成
    const handleAddEvent = async () => {
        if (!title) {
            alert('「タイトル」を入力して下さい');
            return;
        }

        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const authorName = userDocSnap.data().name;

            addDoc(collection(db, 'events'), {
                title: title,
                date: date,
                place: place,
                detail: detail,
                author: authorName,
            });
        }

        setTitle('');
        setDate('');
        setPlace('');
        setDetail('');
    };

    useEffect(() => {
        const eventData = collection(db, 'events');
        onSnapshot(eventData, (snapshot) => {
            const eventList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setEvents(eventList);
        });
    }, []);

    const navigate = useNavigate();

    // イベント削除
    const handleDetailClick = (eventId) => {
        navigate(`/event/${eventId}`);
    };

    const handleDeleteEvent = async (eventId) => {

        try {
            await deleteDoc(doc(db, 'events', eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const onClickNewEvent = () => {
        setNewEvent(!newevent);
    }

    return (
        <div>
            <Header />
            <div class=" w-screen lg:w-3/5 m-auto">
                <button onClick={onClickNewEvent} class="text-white  bg-accent hover:bg-accent/60 inline-flex items-center rounded-lg font-semibold text-xl px-8 py-3 mt-4 ml-2">
                    新規作成
                </button>

                <div class={newevent ? "flex flex-col p-5 mx-2 bg-main rounded-lg" : " hidden"}>
                    <p class="mx-3 text-white text-lg font-semibold">タイトル</p>
                    <input
                        type="text"
                        placeholder="タイトル"
                        value={title}
                        onChange={(eventdata) => {
                            setTitle(eventdata.target.value);
                        }}
                        class=" mx-3 mb-3 rounded-lg px-2 py-1"
                    />
                    <p class="mx-3 text-white text-lg font-semibold">日付</p>
                    <input
                        type="date"
                        value={date}
                        onChange={(eventdata) => {
                            setDate(eventdata.target.value);
                        }}
                        class="mx-3 mb-3 rounded-lg text-gray-400 px-2 py-1"
                    />
                    <p class="mx-3 text-white text-lg font-semibold">場所</p>
                    <input
                        type="text"
                        placeholder="場所"
                        value={place}
                        onChange={(eventdata) => {
                            setPlace(eventdata.target.value);
                        }}
                        class="mx-3 mb-3 rounded-lg px-2 py-1"
                    />
                    <p class="mx-3 text-white text-lg font-semibold">内容</p>
                    <textarea
                        placeholder="イベントの詳細やタイムテーブルなど"
                        rows={5}
                        cols={50}
                        value={detail}
                        onChange={(eventdata) => {
                            setDetail(eventdata.target.value);
                        }}
                        class="mx-3 mb-5 rounded-lg whitespace-pre px-2 py-1"
                    />
                    <button onClick={handleAddEvent} class="text-white  bg-accent hover:bg-accent/60 rounded-lg font-semibold text-xl px-7 py-3 mx-auto">追加</button>

                </div>

                <hr class="border-black my-4" />

                <h2 class=" text-xl font-semibold text-main ml-2">イベント一覧</h2>
                <div class="flex flex-wrap">
                    {events.map((event) => (
                        <div class="w-full">
                            <div key={event.id} class=" bg-main rounded-lg text-white h-40 mx-2 my-2">
                                <div class="flex justify-between">
                                    <h3 class=" text-2xl lg:text-4xl font-semibold pl-6 pt-5">{event.title}</h3>
                                    <div class="text-slate-300 pt-5 pr-6">
                                        <p >{event.date}</p>
                                        <p>{event.place}</p>
                                    </div>
                                </div>
                                <div class="flex justify-end">
                                    <button onClick={() => handleDetailClick(event.id)} class="bg-accent hover:bg-accent/80 rounded-lg text-xl font-semibold px-6 py-4 my-4">詳細</button>
                                    <button onClick={() => handleDeleteEvent(event.id, event.author)} class="bg-accent hover:bg-accent/80 rounded-lg text-xl font-semibold px-6 py-4 my-4 ml-2 mr-6">削除</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Main;

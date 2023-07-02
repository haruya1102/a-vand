import { useParams } from 'react-router-dom';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './Firebase';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import ParticipantForm from "./ParticipantForm";
import ParticipantList from "./ParticipantList";

// イベント詳細画面
const EventDetail = () => {
    const params = useParams();
    const eventId = params.id;
    const [event, setEvent] = useState(null);
    const [editedEvent, setEditedEvent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [participantForm, setParticipantForm] = useState({
        hope: ""
    });
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventRef = doc(db, 'events', eventId);
                const eventSnapshot = await getDoc(eventRef);
                if (eventSnapshot.exists()) {
                    setEvent({ id: eventSnapshot.id, ...eventSnapshot.data() });
                    setParticipants(eventSnapshot.data().participants || []);
                } else {
                    console.log('No event found');
                    setEvent(null);
                }
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        fetchEvent();
    }, [eventId]);

    // 編集
    const handleEditClick = () => {
        setIsEditing(true);
        setEditedEvent({ ...event });
    };

    const handleInputChange = (event) => {
        setEditedEvent((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
    };

    const handleUpdateEvent = async () => {
        try {
            await updateDoc(doc(db, 'events', eventId), editedEvent);
            setIsEditing(false);
            setEvent({ ...editedEvent });
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleFormInputChange = (event) => {
        setParticipantForm((prevForm) => ({
            ...prevForm,
            [event.target.name]: event.target.value
        }));
    };

    const handleAddParticipant = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            try {
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const newParticipant = {
                        name: userData.name,
                        part: userData.part,
                        grade: userData.grade,
                        url: userData.url,
                        ...participantForm
                    };
                    const updatedParticipants = [...participants, newParticipant];

                    await updateDoc(doc(db, 'events', eventId), { participants: updatedParticipants });

                    setParticipants(updatedParticipants);
                    setParticipantForm({
                        hope: ""
                    });
                }
            } catch (error) {
                console.error('Error adding participant:', error);
            }
        }
    };


    const handleDeleteParticipant = async (index) => {
        // ローカルの参加者一覧から削除
        setParticipants((prevParticipants) =>
            prevParticipants.filter((_, i) => i !== index)
        );

        // Firestoreから参加者を削除
        try {
            const deletedParticipant = participants[index];
            const eventRef = doc(db, 'events', eventId);
            await updateDoc(eventRef, {
                participants: arrayRemove(deletedParticipant)
            });
        } catch (error) {
            console.error('Error deleting participant:', error);
        }
    };

    const fetchUserData = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            try {
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setParticipantForm((prevForm) => ({
                        ...prevForm,
                        name: userData.name
                    }));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div class="w-screen lg:w-3/5 m-auto bg-main rounded-lg text-white mt-3">
                {!isEditing ? (
                    <div class=" mx-10 py-7">
                        <div class="flex justify-between pb-8">
                            <h3 class="text-3xl lg:text-5xl font-semibold mt-3 mr-2">{event.title}</h3>
                            <div class=" font-medium border-l pl-4">
                                <p>作成者：{event.author}</p>
                                <p>日付：{event.date}</p>
                                <p>場所：{event.place}</p>
                            </div>
                        </div>
                        <p class=" py-2 text-lg">{event.detail.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}</p>
                        <button onClick={handleEditClick} class=" bg-accent hover:bg-accent/70 rounded-md text-xl font-semibold py-3 px-5 mt-8">編集</button>
                    </div>
                ) : (
                    <div class="flex flex-col px-10 py-7">
                        <h3 class="text-3xl font-semibold">イベント編集</h3>
                        <h4 class="pt-3 text-lg font-semibold">タイトル</h4>
                        <input
                            type="text"
                            name="title"
                            value={editedEvent.title}
                            placeholder="タイトル"
                            onChange={handleInputChange}
                            class="rounded-lg px-2 py-1 text-black"
                        />

                        <h4 class="pt-3 text-lg font-semibold">日付</h4>
                        <input
                            type="date"
                            name="date"
                            value={editedEvent.date}
                            onChange={handleInputChange}
                            class="rounded-lg px-2 py-1 text-black"
                        />

                        <h4 class="pt-3 text-lg font-semibold">場所</h4>
                        <input
                            type="text"
                            name="place"
                            value={editedEvent.place}
                            placeholder="場所"
                            onChange={handleInputChange}
                            class="rounded-lg px-2 py-1 text-black"
                        />

                        <h4 class="pt-3 text-lg font-semibold">内容</h4>
                        <textarea
                            name="detail"
                            rows={5}
                            cols={50}
                            value={editedEvent.detail}
                            placeholder="イベントの詳細やタイムテーブルなど"
                            onChange={handleInputChange}
                            class="rounded-lg px-2 py-1 text-black"
                        ></textarea>

                        <button onClick={handleUpdateEvent} class="text-white  bg-accent hover:bg-accent/60 rounded-lg font-semibold text-xl px-7 py-3 mt-4 mx-auto">更新</button>
                    </div>
                )}

                <hr class="border-white my-4 mx-10" />

                {/* 参加フォームのコンポーネント */}
                <ParticipantForm
                    participantForm={participantForm}
                    handleFormInputChange={handleFormInputChange}
                    handleAddParticipant={handleAddParticipant}
                />

                {/* 参加者一覧のコンポーネント */}
                <ParticipantList
                    participants={participants}
                    handleDeleteParticipant={handleDeleteParticipant}
                />

            </div>
        </div>
    );
};

export default EventDetail;

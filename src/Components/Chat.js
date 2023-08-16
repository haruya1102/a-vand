// Chat.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, addDoc, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db, auth } from './Firebase';
import Header from './Header';

const Chat = () => {
    const { participantId } = useParams();
    const currentUser = auth.currentUser;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [participantName, setParticipantName] = useState('');

    useEffect(() => {
        if (participantId && currentUser) {
            const chatId = [participantId, currentUser.uid].sort().join('-');
            const messagesCollection = collection(db, 'chats', chatId, 'messages');
            const messagesQuery = query(messagesCollection, orderBy('timestamp'));

            const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
                const messageList = snapshot.docs.map((doc) => doc.data());
                setMessages(messageList);
            });

            const participantDoc = doc(db, 'users', participantId);
            getDoc(participantDoc).then((docSnap) => {
                if (docSnap.exists()) {
                    setParticipantName(docSnap.data().name);
                }
            });

            return () => unsubscribe();
        }
    }, [participantId, currentUser]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') {
            return;
        }

        if (participantId && currentUser) {
            const chatId = [participantId, currentUser.uid].sort().join('-');
            const messagesCollection = collection(db, 'chats', chatId, 'messages');

            await addDoc(messagesCollection, {
                content: newMessage,
                sender: currentUser.uid,
                timestamp: new Date(),
            });

            setNewMessage('');
        }
    };

    return (
        <div>
            <Header />
            <div class="w-screen lg:w-3/5 m-auto bg-main rounded-lg text-white mt-3 pb-3">
                <h2 class="text-3xl font-semibold py-6 pl-10">チャット</h2>
                <h2 className="text-2xl font-semibold pt-6 pl-10">{participantName}</h2>
                <hr class="border-white mb-4 mx-10" />
                <div class="px-10">
                    <div>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`py-2 ${message.sender === currentUser.uid ? 'text-right' : 'text-left'}`}
                            >
                                <div
                                    className={`inline-block rounded-lg px-4 py-2 ${message.sender === currentUser.uid
                                        ? 'bg-accent text-white'
                                        : 'bg-white text-black'
                                        }`}
                                >
                                    <p className="text-lg">{message.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div class="py-2 flex justify-end flex-wrap">
                        <textarea
                            type="text"
                            placeholder="メッセージを入力..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            class="rounded-lg px-2 py-2 w-full text-black"
                        />
                        <button onClick={handleSendMessage} class=" bg-accent hover:bg-accent/80 rounded-lg text-lg font-semibold px-7 py-3 mt-2">
                            送信
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;

import React from 'react';

const ParticipantForm = ({ participantForm, handleFormInputChange, handleAddParticipant }) => {
    return (
        <div class=" flex flex-col mx-10 py-8">
            <h3 class="text-3xl font-semibold  pb-8">バンドマッチング</h3>
            <h4 class=" text-lg font-semibold pb-3">あなたのこだわりを書こう</h4>
            <textarea
                type="text"
                rows={3}
                cols={50}
                name="hope"
                value={participantForm.hope}
                onChange={handleFormInputChange}
                placeholder="〜のコピーがしたい,〜な曲がしたい,など"
                class=" rounded-lg px-2 py-1 text-black mb-4"
            />
            <button onClick={handleAddParticipant} class="bg-accent hover:bg-accent/80 rounded-lg font-semibold py-4 px-5 mx-auto">マッチングに参加</button>
        </div>
    );
};

export default ParticipantForm;

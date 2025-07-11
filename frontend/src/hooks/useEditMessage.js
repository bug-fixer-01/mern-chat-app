import React from 'react'

const useEditMessage = () => {

    const editMessage = async (messageId, newText) => {

        try {
            await fetch(`api/message/edit/${messageId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: newText })
            });
        }
         catch (error) {
            console.error("Error editing message:", error);
        }
    }
    return  editMessage   
}

export default useEditMessage
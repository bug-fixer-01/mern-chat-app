import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessage = () => {
    const { socket } = useSocketContext(); // Get the socket instance from context
    const { messages, setMessages } = useConversation(); // Get messages and function to update them

    useEffect(() => {
        // Listen for the "newMessage" event from the server
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]); // Append the new message to the existing messages array
        });

        // Listen for the "messageEdited" event from the server
        socket?.on("messageEdited", (newMessage) => {
            console.log("New Edited Message Received", newMessage)
            setMessages(messages.map((message) => {
                    if(message._id === newMessage._id){
                        message.messages = newMessage.messages,
                        message.edited = newMessage.edited
                    }
                    return message
                })
            ); 
        });

        // Cleanup function: Remove the event listener when the component unmounts
        return () => {
            socket?.off("newMessage");
            socket?.off("messageEdited");
        };
    }, [socket, setMessages, messages]); // Dependencies: This effect runs when any of these change
};

export default useListenMessage;

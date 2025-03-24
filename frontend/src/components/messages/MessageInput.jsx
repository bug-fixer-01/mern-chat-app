import { useState, useRef, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessage";
// import useGetMessage from "../../hooks/useGetMessages";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { BsEmojiSmile } from "react-icons/bs";

const MessageInput = () => {
    const [message, setMessages] = useState("")
    const sendMessage = useSendMessage();
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null); // Reference to emoji picker
    const inputRef = useRef(null); // Reference to input field

    const handleSubmit = async (e) => {
        e && e.preventDefault();
        if (!message) return;
        await sendMessage(message.trim());
        setMessages("")
    }
    const addEmoji = (emoji) => {
        setMessages((prev) => prev + emoji.native); // Append emoji to message
        // setShowPicker(false); // Close picker after selecting an emoji
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevent default Enter behavior
         handleSubmit();
        }
      };

    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input type="text"
                    placeholder="Type message..."
                    className="placeholder-slate-800 pl-9 bg-white rounded-lg text-sm block p-2.5 w-full focus:outline-none text-black"
                    value={message}
                    onChange={(e) => setMessages(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="absolute inset-y-0 ps-2 " onClick={() => setShowPicker(!showPicker)}>
                    <BsEmojiSmile className="text-black" />
                </button>
                {showPicker && (
                    <div ref={pickerRef} style={{ position: "absolute", bottom: "50px", left: "0", zIndex: 100 }}>
                        <Picker data={data} onEmojiSelect={addEmoji} />
                    </div>
                )}
                <button type="submit" className="absolute inset-y-0 end-0 pe-3">
                    <IoIosSend />
                </button>
            </div>
        </form>
    )
}
export default MessageInput
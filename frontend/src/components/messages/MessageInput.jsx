import { useState, useRef, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessage";
import useEditMessage from "../../hooks/useEditMessage";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { BsEmojiSmile } from "react-icons/bs";

const MessageInput = ({ editing, setEditing }) => {
    const [message, setMessages] = useState("")
    const sendMessage = useSendMessage();
    const editMessage = useEditMessage();
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null); // Reference to emoji picker
    const inputRef = useRef(null); // Reference to input field 
    console.log(showPicker)

    const handleSubmit = async (e) => {
        e && e.preventDefault();
        if (!message) return;

        const trimMessage = message.trim();
        setMessages(""); // Clear input after sending

        // if message is being edited
        if (editing) {
            await editMessage(editing._id, trimMessage);
            setEditing(); // Clear editing state after sending
            return;
        }
        await sendMessage(trimMessage); // Send message
    }
    const addEmoji = (emoji) => {
        setMessages((prev) => prev + emoji.native); // Append emoji to message
        // setShowPicker(false); // Close picker after selecting an emoji
    };

    useEffect(() => {
        if (editing) {
            setMessages(editing.messages);
        } else {
            setMessages("");
        }

        if (editing && inputRef.current) {
            inputRef.current.focus(); // Focus on input when editing
        }
    }, [editing])

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
        <input
            ref={inputRef}
            type="text"
            placeholder="Type message..."
            className="placeholder-slate-800 pl-9 bg-white rounded-lg text-sm block p-2.5 w-full focus:outline-none text-black"
            value={message}
            onChange={(e) => setMessages(e.target.value)}
            onKeyDown={handleKeyDown}
        />

        {/* ⬇️ This container holds both the emoji button and picker */}
        <div ref={pickerRef} className="absolute left-0 inset-y-0 flex items-center ps-2">
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent click from bubbling up
                    setShowPicker((prev) => !prev);
                }}
            >
                <BsEmojiSmile className="text-black" />
            </button>

            {showPicker && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "50px",
                        left: "0",
                        zIndex: 100,
                    }}
                >
                    <Picker data={data} onEmojiSelect={addEmoji} />
                </div>
            )}
        </div>

        <button type="submit" className="absolute inset-y-0 end-0 pe-3">
            <IoIosSend />
        </button>
    </div>
</form>

    )
}
export default MessageInput
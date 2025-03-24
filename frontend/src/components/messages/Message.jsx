import { useAuthContext } from "../../context/AuthContex"
import { extractTime } from "../../utils/TimeandDate"
import useGetMessage from "../../hooks/useGetMessages"
import useConversation from "../../zustand/useConversation"


const Message = ({ messages }) => {
    const { authUser } = useAuthContext();
    const fromMe = messages.senderId === authUser._id
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const formattedTime = extractTime(messages.createdAt);
    const bubbleBgColor = fromMe ? 'bg-opacity-80 bg-black text-white' : ' bg-opacity-80 bg-white text-black'
    return (
        <div>
            <div className={`chat ${chatClassName}`}>
                <div className={`chat-bubble ${bubbleBgColor} text-black  max-w-[75%] break-words whitespace-pre-wrap`}>
                    {messages.messages}
                    <time className=" pl-2 chat-footer text-[10px] text-white gap-1 items-center opacity-50 ">{formattedTime}</time>
                </div>
            </div>
        </div>
    )
}
export default Message 

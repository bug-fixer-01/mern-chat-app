import { useAuthContext } from "../../context/AuthContex"
import { extractTime } from "../../utils/TimeandDate"
// import { BsCheck2All } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";


const Message = ({ messages, setEditing }) => {
    const { authUser } = useAuthContext();
    const fromMe = messages.senderId === authUser._id
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const editButton = fromMe ? 'flex justify-end' : '';
    const formattedTime = extractTime(messages.createdAt);
    const bubbleBgColor = fromMe ? 'bg-opacity-80 bg-black text-white' : ' bg-opacity-80 bg-white text-black'
    const timeColor = fromMe ? 'text-white' : 'text-black'
    
    return (
        <div>
            <div className={`chat ${chatClassName} ${editButton} items-center`}>
                {fromMe && <button className="bg-gray-300  text-black p-2 rounded-2xl" onClick={() =>setEditing(messages)}><MdOutlineModeEdit /></button>}
                <div className={`chat-bubble ${bubbleBgColor} text-black  max-w-[75%] break-words whitespace-pre-wrap`}>
                    {messages.messages}
                    <time className={`pl-2 chat-footer text-[10px] ${timeColor} gap-1 items-center opacity-50`}>{formattedTime}</time>
                    {/* {fromMe && <BsCheck2All/>}  */}
                </div>
            </div>
        </div>
    )
}
export default Message


// {editing ? (
//   <input value={editText} onChange={e => setEditText(e.target.value)} />
// ) : (
//   <span>{message.text} {message.edited && "(edited)"}</span>
// )}
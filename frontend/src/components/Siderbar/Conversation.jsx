import { useSocketContext } from "../../context/SocketContext";
import { extractTime } from "../../utils/TimeandDate";
import useConversation from "../../zustand/useConversation"
import { BsCheck2All } from "react-icons/bs";

const Conversation = ({conversation,lastMessages}) => {
    const{selectedConversation , setSelectedConversation} = useConversation(); 
    const isSelected = selectedConversation?._id === conversation._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id)

    let lastMessage = lastMessages[conversation._id]

    if(lastMessage?.msg.length > 30){
        lastMessage.msg = lastMessage.msg.slice(0,30) + "..."
    }

    return <>
        <div className={`flex gap-3 items-center rounded-xl p-2 py-2 cursor-pointer 
            ${isSelected ? "bg-black bg-opacity-25 hover:bg-black hover:bg-opacity-35 " : " hover:bg-black hover:bg-opacity-10"}
            `}
                onClick={()=> setSelectedConversation(conversation)}
            >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full bg-black">
                    <img src={`${conversation.profileImageUrl}`} alt="user avatar" />
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className=" text-black">{conversation.username}</p>
                </div>
                <span className="text-sm text-slate-700 flex gap-1 items-center">{lastMessage?.fromMe && <BsCheck2All className="relative top-[2px]"/> } {lastMessage?.msg}</span>
            </div> 
            <span className="text-sm text-cyan-800">{lastMessage?.createdAt && extractTime( lastMessage.createdAt)}</span>
        </div>
        {/* {!lastIdx && <div className="divider my-0 py-0"></div>} */}
    </>
}

export default Conversation
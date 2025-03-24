import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation"

const Conversation = ({conversation}) => {
    const{selectedConversation , setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id)
    console.log(isOnline)

    return <>
        <div className={`flex gap-3 items-center rounded-xl p-2 py-2 cursor-pointer 
            ${isSelected ? "bg-black bg-opacity-25 hover:bg-black hover:bg-opacity-35 " : " hover:bg-black hover:bg-opacity-10"}
            `}
                onClick={()=> setSelectedConversation(conversation)}
            >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full bg-black">
                    <img src="https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/user-256.png" alt="user avatar" />
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className=" text-black">{conversation.username}</p>
                </div>
                <span className="text-sm text-slate-700">hello there , what's up!!</span>
            </div>
        </div>
        {/* {!lastIdx && <div className="divider my-0 py-0"></div>} */}
    </>
}

export default Conversation
import Messages from "./Messages"
import MessageInput from "./MessageInput"
import { PiChatsThin } from "react-icons/pi";
import useConversation from "../../zustand/useConversation"
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContex";
import { FaArrowLeft } from "react-icons/fa6";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const [editing, setEditing] = useState();

  useEffect(() => {
    setEditing();
  }, [selectedConversation]);

  useEffect(() => {

    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div className={`flex-grow ${selectedConversation ? "flex" : "hidden"} sm:flex relative bg-gray-200  flex-col`}>
      {!selectedConversation ? (<NoChatSelected />)
        : (<>
          <div className='bg-white flex justify-between items-center w-full absolute h-[5rem] backdrop-blur-md z-10 bg-opacity-30 px-4 py-2'>
            <div className="flex items-center gap-2">
              <FaArrowLeft className="block sm:hidden" onClick={() => setSelectedConversation(null)}></FaArrowLeft>
              <div className="w-12 h-12 rounded-full">
                <img
                  src={`${selectedConversation.profileImageUrl}`}
                  alt="user avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <span className='text-gray-900 font-'>{selectedConversation.fullname}</span>
            </div>

          </div>
          <Messages setEditing={setEditing} />
          <MessageInput editing={editing} setEditing={setEditing} />
        </>)}
    </div>
  )
}

const NoChatSelected = () => {
  const { authUser } = useAuthContext()
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-black-200 font-semibold flex flex-col items-center gap-2'>
        <p className="text-gray-600">Welcome 👋 {authUser.username}🌿</p>
        <p>Select a chat to start messaging</p>
        <PiChatsThin className='text-3xl md:text-6xl' />
      </div>
    </div>
  )
}

export default MessageContainer
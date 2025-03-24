import Messages from "./Messages"
import MessageInput from "./MessageInput"
import { PiChatsThin } from "react-icons/pi";
import useConversation from "../../zustand/useConversation"
import { useEffect,useState } from "react";
import { useAuthContext } from "../../context/AuthContex";
import { RiSearch2Fill } from "react-icons/ri";
import { IoVideocam , IoCall } from "react-icons/io5";
import { FaStar, FaArrowLeft } from "react-icons/fa6";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  
  const[isSearch,setSearch] = useState(true) //Intial color is white
  const[isVideo,setVideo] = useState(true) //Intial color is white
  const[isCall,setCall] = useState(true) //Intial color is white
  const[isStar,setStar] = useState(true) //Intial color is white
  


  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div className={`flex-grow ${selectedConversation ? "flex" : "hidden"} sm:flex relative bg-gray-200  flex-col`}>
      {!selectedConversation ? (<NoChatSelected />)
        : (<>
          <div className='bg-white flex justify-between items-center w-full absolute h-[5rem] backdrop-blur-md z-10 bg-opacity-30 px-4 py-2'>
            <div className="flex items-center gap-2">
              <FaArrowLeft className="block sm:hidden" onClick={()=>setSelectedConversation(null)}></FaArrowLeft>
              <div className="w-11 h-11 rounded-2xl bg-slate-700"></div>
              <span className='text-gray-900 font-'>{selectedConversation.fullname}</span>
            </div>
            <div className="flex gap-2">
              <div
                onClick={()=>{setSearch(!isSearch)}}
                className={`w-8 h-8 rounded-xl cursor-pointer flex items-center justify-center ${isSearch ? 'bg-white':'bg-black'}`}>
                <RiSearch2Fill className={`w-4 h-4 ${isSearch ? 'text-black':'text-white'}`} />
              </div>
              <div 
                onClick={()=>{setVideo(!isVideo)}}
                className={`w-8 h-8 rounded-xl cursor-pointer flex items-center justify-center ${isVideo ? 'bg-white':'bg-black'}`}>
                <IoVideocam className={`w-4 h-4 text-black ${isVideo ? 'text-black':'text-white'}`}/>
              </div>
              <div 
                onClick={()=>{setCall(!isCall)}}
              className={`w-8 h-8 rounded-xl cursor-pointer flex items-center justify-center ${isCall ? 'bg-white':'bg-black'}`}>
              <IoCall className={`w-4 h-4 ${isCall ? 'text-black':'text-white'}`} />
              </div>
              <div 
                onClick={()=>{setStar(!isStar)}}
              className={`w-8 h-8 rounded-xl cursor-pointer flex items-center justify-center ${isStar ? 'bg-white':'bg-black'}`}>
                <FaStar className={`w-4 h-4 ${isStar ? 'text-black':'text-white'}`}/>
              </div>
            </div>
          </div>
          <Messages />
          <MessageInput />
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
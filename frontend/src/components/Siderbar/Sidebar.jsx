import SerachInput from "./SerachInput"
import Conversations from "./Conversations"
import useConversation from "../../zustand/useConversation"
import Logout from "./Logout"
import { useState } from "react"
import { useAuthContext } from "../../context/AuthContex"
import useGetConversation from "../../hooks/useGetConversation"


const Siderbar = () => {
  const { selectedConversation } = useConversation()
  const [serachInput, setSearchInput] = useState("")

  const { loading, conversations } = useGetConversation(); 
  const isConversations = conversations.length === 0
  
  return (
    <div className={`bg-white ${selectedConversation ? "hidden" : "flex"} w-[23rem] h-screen p-4 sm:flex flex-col`}>
      <Logout />
      <h1 className="text-2xl font-medium text-black pl-1 pb-2">Messages</h1>
      <SerachInput onInput={setSearchInput} />
      {isConversations && <div className="h-full flex flex-col flex-wrap items-center justify-center">
        <h1>Invite People</h1>
        <h2>and start Your conversation</h2>
      </div>}
      <Conversations filter={serachInput} />
    </div>
  )
}

export default Siderbar
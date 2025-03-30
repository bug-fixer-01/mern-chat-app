import SerachInput from "./SerachInput"
import Conversations from "./Conversations"
import useConversation from "../../zustand/useConversation"
import Logout from "./Logout"
import { SearchIndex } from "emoji-mart"
import { useState } from "react"


const Siderbar = () => {
  const { selectedConversation } = useConversation()
  const [ serachInput, setSearchInput ] = useState("")
  return (
    <div className={`bg-white ${selectedConversation? "hidden" : "flex"} w-[23rem] p-4 sm:flex flex-col`}>
        <Logout/>
        <h1 className="text-2xl font-medium text-black pl-1 pb-2">Messages</h1>
        <SerachInput onInput={setSearchInput}/>
        <Conversations filter={serachInput}/>
    </div>
  )
}

export default Siderbar
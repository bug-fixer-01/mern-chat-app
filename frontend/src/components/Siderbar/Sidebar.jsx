import SerachInput from "./SerachInput"
import Conversations from "./Conversations"
import useConversation from "../../zustand/useConversation"
import Logout from "./Logout"


const Siderbar = () => {
  const { selectedConversation } = useConversation()
  return (
    <div className={`bg-white ${selectedConversation? "hidden" : "flex"} sm:max-w-[23rem] flex-grow p-4 sm:flex flex-col`}>
        <Logout/>
        <h1 className="text-2xl font-medium text-black pl-1 pb-2">Messages</h1>
        <SerachInput/>
        <Conversations/>
    </div>
  )
}

export default Siderbar
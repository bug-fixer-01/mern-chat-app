import SerachInput from "./SerachInput"
import Conversations from "./Conversations"
import useConversation from "../../zustand/useConversation"
import Logout from "./Logout"
import { useState } from "react"
import { useAuthContext } from "../../context/AuthContex"
import useGetConversation from "../../hooks/useGetConversation"


const Sidebar = () => {
  const { selectedConversation } = useConversation();
  const [searchInput, setSearchInput] = useState("");
  const { loading, conversations } = useGetConversation();

  const isConversations = !loading && conversations.length === 0;

  return (
    <div className={`bg-white ${selectedConversation ? "hidden" : "flex"} w-[23rem] h-screen p-4 sm:flex flex-col`}>
      <Logout />
      <h1 className="text-2xl font-medium text-black pl-1 pb-2">Messages</h1>
      <SerachInput onInput={setSearchInput} />
      
      {/* Only show this block when loading is false and no conversations */}
      {!loading && isConversations && (
        <div className="h-full flex flex-col flex-wrap items-center justify-center">
          <h1>Invite People</h1>
          <h2>and start Your conversation</h2>
        </div>
      )}

      {/* Only show conversations when not loading */}
      {!loading && <Conversations filter={searchInput} />}
    </div>
  );
};

export default Sidebar;
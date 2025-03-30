import { useEffect, useState } from "react";
import useGetConversation from "../../hooks/useGetConversation"
import Conversation from "./Conversation"
import useGetLastMessage from "../../hooks/useGetLastMessages";

const Conversations = ({ filter }) => {

  const { loading, conversations } = useGetConversation();
  const { lastMessages } = useGetLastMessage();

  const [filteredConversations, setFilteredConversations] = useState(conversations);

  useEffect(() => {
    const filtered = conversations.filter((conversation) => {
      return conversation.username.toLowerCase().startsWith(filter.toLowerCase())
    })
    setFilteredConversations(filtered);

  }, [conversations, filter])

  return (
    <div className="py-6 gap-4 flex flex-col overflow-auto ">

      {filteredConversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversation.length - 1}
          lastMessages={lastMessages}
        />
      ))}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}

    </div>
  )
}

export default Conversations
import { useEffect, useRef } from "react";
import useGetMessage from "../../hooks/useGetMessages"
import Message from "./Message"
import useListenMessage from "../../hooks/useListenMessage";

const Messages = ({setEditing}) => {
  const { messages } = useGetMessage();
  useListenMessage();
  const messagesEndRef = useRef()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView()

  }, [messages])
  
  console.log(messages);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      <div className="h-[5rem] w-full bg-transparent"/>
      {messages.length > 0 && messages.map((message) =>(
        <div key={message._id} ref={messagesEndRef}>
           <Message messages={message}  setEditing={setEditing} />  
        </div>
      ))}

      {messages.length === 0 && (
        <p className="text-center pt-10 text-black opacity-70">Send a message to start the Conversation</p>
      )}
    </div>
  )
}

export default Messages
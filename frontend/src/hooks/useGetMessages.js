import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessage = () => {
    // const { loading, setLoading } = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const GetMessage = async () => {
            // setLoading(true)
            try {
                const res = await fetch(`/api/message/${selectedConversation._id}`)
                const data = await res.json()

                if (data.error) {
                    console.log(data)
                }
                setMessages(data)
            }
            catch (e) {
                toast.error(e)
            }
            // finally {
            //     setLoading(false)
            // }
        }
        if(selectedConversation?._id) GetMessage();
    },[selectedConversation?._id,setMessages])

    return {messages}
}

export default useGetMessage
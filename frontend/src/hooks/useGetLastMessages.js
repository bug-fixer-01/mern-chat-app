import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetLastMessage = () => {
    const {lastMessages, setLastMessages, messages} = useConversation();

    useEffect(() => {
        const GetLastMessage = async () => {
            // setLoading(true)
            try {
                const res = await fetch(`/api/message/lastMessage`)
                const data = await res.json()

                if (data.error) {
                    console.log(data)
                }
                setLastMessages(data)
            }
            catch (e) {
                toast.error(e)
            }
        }
        GetLastMessage();
    },[messages])

    return {lastMessages}
}

export default useGetLastMessage
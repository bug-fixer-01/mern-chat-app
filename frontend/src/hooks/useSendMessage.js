import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {

        try {
            const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({ message })
            })

            const data = await res.json()
            if (data.error) {
                console.log(data)
            }
            else {
                setMessages([...messages,data])
            }
        }
        catch (e) {
            toast.error(e)
        }
    }

    return sendMessage

}

export default useSendMessage
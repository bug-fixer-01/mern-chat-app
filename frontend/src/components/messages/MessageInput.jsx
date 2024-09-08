import { IoIosSend } from "react-icons/io";

const MessageInput = () => {
    return (
        <form className="px-4 my-3">
            <div className="w-full relative">
                <input type="text"
                    placeholder="send message"
                    className=" rounded-lg text-sm block p-2.5 w-full focus:outline-none text-white" />
                <button type="submit" className="absolute inset-y-0 end-0 pe-3">
                    <IoIosSend />
                </button>
            </div>
        </form>
    )
}
export default MessageInput

const Message = () => {
    return (
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className={'chat-bubble text-white bg-green-700'}>hi! what is up</div>
            <time className="chat-footer text-xs flex gap-1 items-center opacity-50">12:45</time>
        </div>
    )
}

export default Message 
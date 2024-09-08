const Conversation = () => {
    return <>
        <div className="flex gap-2 items-center hover:bg-green-900 rounded p-2 py-1 cursor-pointer">
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <img src="https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/user-256.png" alt="user avatar" />
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="">Prayash singh</p>
                    <span className="text-xl">😎</span>
                </div>
            </div>
        </div>
        <div className="divider my-0 py-0 h-1"></div>
    </>
}

export default Conversation
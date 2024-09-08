import SerachInput from "./SerachInput"
import Conversations from "./Conversations"
import Logout from "./Logout"


const Siderbar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      
        <SerachInput/>
        <div className="divider px-3"></div>
        <Conversations/>
        <Logout/>
    </div>
  )
}

export default Siderbar
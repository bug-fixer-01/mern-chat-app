// import LeftNavigatebar from "../../components/Navigate/LeftNavigatebar"
import Sidebar from "../../components/Siderbar/Sidebar"
import MessageContainer from "../../components/messages/MessageContainer"



const Homes = () => {
  return (
    <div className="flex justify-end w-full bg-blue-300 h-full   ">
      <Sidebar />
      {/* <LeftNavigatebar /> */}
      <MessageContainer />
      
    </div>
  )
} 
export default Homes
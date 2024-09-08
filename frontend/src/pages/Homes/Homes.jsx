import Sidebar from "../../components/Siderbar/Sidebar"
import MessageContainer from "../../components/messages/MessageContainer"

const Homes = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-0 ">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}
export default Homes
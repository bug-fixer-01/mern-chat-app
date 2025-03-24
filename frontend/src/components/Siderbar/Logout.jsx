import { BiLogOut } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContex";
import useLogout from "../../hooks/useLogout";

const Logout = () => {

    const { loading, Logout } = useLogout();

    return <div className="flex flex-col relative w-full top-6 items-end bg-none">
    
        <BiLogOut className="w-5 h-5 text-black opacity-100 cursor-pointer" onClick={Logout} />

        {/* <span className="opacity-70 text-sm cursor-pointer" onClick={Logout}> Log out</span> */}
    </div>
}
export default Logout
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContex";


const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const Logout = async () => {

        setLoading(true);

        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "content-Type": "application/json" }
            })

            const data = await res.json()
            if (data.error) {
                toast.error(data.error)
            }
            localStorage.removeItem("chat-user")
            setAuthUser(null)
        }
        catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }


    return { loading, Logout }
}

export default useLogout;
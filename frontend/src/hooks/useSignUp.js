import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContex";


const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const Signup = async ({ fullname, username, password }) => {
        const success = handleInputErrors({ fullname, username, password });
        if (!success) return;


        setLoading(true)

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, password }),
                credentials: "include"
            })

            const data = await res.json();
            if (data.error) {
                toast.error(data.error)
            }
            else {
                toast.success("successfully signed up")
            }
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)
        }
        catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }
    return { loading, Signup }
}

export default useSignup

function handleInputErrors({ fullname, username, password }) {
    if (!fullname || !username || !password ) {
        toast.error("please fill in all fields")
        return false;
    }

    if (password.length < 6) {
        toast.error("password must be at least 6 characters")
        return false;
    }

    return true;
}
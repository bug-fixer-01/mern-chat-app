import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContex";



const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const Signup = async ({ fullname, username, password, email,profileImageUrl }) => {
        const success = handleInputErrors({ fullname, username, password, email });
        if (!success) return;


        setLoading(true)

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, password, email,profileImageUrl }),
                credentials: "include"
            })

            const data = await res.json();
            console.log(data)
            if (res.status != 201) {
                throw new Error(data.error)
            }
            else {
                toast.success("successfully signed up")
            }
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)
        }
        catch (error) {
            toast.error(error.message)
            console.log("hello")
        }
        finally {
            setLoading(false)
        }
    }
    return { loading, Signup }
}

export default useSignup

function handleInputErrors({ fullname, username, password, email }) {
    if (!fullname || !username || !password || !email) {
        toast.error("please fill in all fields")
        return false;
    }

    if (password.length < 6) {
        toast.error("password must be at least 6 characters")
        return false;
    }

    return true;
}
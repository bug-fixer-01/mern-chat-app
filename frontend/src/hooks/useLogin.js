import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContex";


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const Login = async ({ username, password }) => {
        const success = handleInputErrors({ username, password });
        if (!success) return;

        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            })

            const data = await res.json()
            console.log(data)
            if (res.status != 201) {
                console.log(data.error)
            }
            else {
                localStorage.setItem("chat-user", JSON.stringify(data))
                setAuthUser(data)
                toast.success("successfully logged in")
            }
        }
        catch (error) {
            // toast.error(error.message)
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }


    return { loading, Login }
}

export default useLogin;

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("please fill in all fields")
        return false;
    }
    return true;
}
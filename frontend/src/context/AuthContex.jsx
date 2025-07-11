import { createContext, useState , useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () =>{   
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) =>{
    const [authUser , setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null )

    useEffect(()=>{
        localStorage.setItem("chat-user",JSON.stringify(authUser))  
    },[authUser])

    return <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}
        </AuthContext.Provider>
}   
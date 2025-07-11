import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthContex";

const useGetConversation = () => {
    const[loading,setLoading] = useState(false);
    const[conversations,setConversation] = useState([]);
    const {setAuthUser} = useAuthContext();


    useEffect(() =>{
        const getConversation = async ()=> {
            setLoading(true);
            try {
                const res = await fetch('/api/Users');
                const data = await res.json();
                if(data.error){
                    if( res.status === 401){
                        setAuthUser()
                    }
                    throw new Error(data.error)
                }
                setConversation(data)
            }catch(error){
               console.log(error.message)
            }finally {
                setLoading(false)
            }
        }
        
        getConversation();
    },[])

    return {loading,conversations}
}

export default useGetConversation
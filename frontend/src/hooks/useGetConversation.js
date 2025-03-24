import { useEffect, useState } from "react"


const useGetConversation = () => {
    const[loading,setLoading] = useState(false);
    const[conversations,setConversation] = useState([]);

    useEffect(() =>{
        const getConversation = async ()=> {
            setLoading(true);
            try {
                const res = await fetch('/api/Users');
                const data = await res.json();
                if(data.error) {
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
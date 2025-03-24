import React from 'react'
import Logout from "../../components/Siderbar/Logout"
import { IoChatbubbleSharp } from "react-icons/io5";

const LeftNavigatebar = () => {
  return (
    <div className='w-[5rem] rounded-xl relative bg-blue-950 hidden xl:flex '>
        <Logout className= "bottom-0"/>
    </div>
  )
}

export default LeftNavigatebar  
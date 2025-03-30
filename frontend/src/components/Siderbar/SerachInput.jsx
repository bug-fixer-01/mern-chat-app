import { FaSearch  } from "react-icons/fa";


const SerachInput = ({onInput}) => {
  const handleInput = (e) => {
    onInput(e.target.value)
  }
  return (
    <form className="flex items-center pb-4 outline-none">
       <input onChange={handleInput} type="text" placeholder="Serach or start a message" className="focus:outline-none input w-full h-11 placeholder-gray-500 text-black bg-gray-400 bg-opacity-30 border-none outline-none rounded-xl">
      </input>
      <FaSearch className="relative right-7 cursor-pointer"/>
    </form>
  )
}

export default SerachInput
import { FaSearch  } from "react-icons/fa";


const SerachInput = () => {
  return (
    <form className="flex items-center gap-2">
       <input type="text" placeholder="Serach..." className="input input-bordered rounded-full" />
       <button type="submit" className="btn btn-circle bg-green-900 text-white border">
       <FaSearch />
       </button>
    </form>
  )
}

export default SerachInput
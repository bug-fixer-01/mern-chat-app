import { Link } from "react-router-dom"
import { useState } from "react"
import useLogin from "../../hooks/useLogin";

const Login = ({ isLoggedIn }) => {

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    })

    const { loading, Login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Login(inputs)
    }

    return (
        <div className="flex flex-col items-center justify-center w-[18rem] sm:w-[22rem] mx-auto">
            <div className="w-full p-6 rounded-3xl bg-clip-padding bg-white   ">
                <h2 className="text-3xl text-center text-black font-bold">Login </h2>
                <span className="flex py-4 text-black text-sm font-medium text-center" >hey,Enter you details to get Sign in to your account</span>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className="text-base text-black label-text">Username</span>
                        </label>
                        <input type="text" placeholder='Enter Username' className="input focus:outline-none bg-white text-slate-900 placeholder-gray-600 input-bordered w-full h-10"
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base text-black label-text">Password</span>
                        </label>
                        <input type="password" placeholder='Enter Password' className="input focus:outline-none bg-white text-slate-900 placeholder-gray-600 input-bordered w-full h-10"
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <div className="pt-2">
                        <button disabled={loading} className="rounded-lg bg-indigo-600 text-slate-800 font-medium bg-opacity-70 border-none btn-block btn-sm mt-2">Login</button>
                    </div>
                    <span className="text-slate-600">Don't have an account?</span><Link to='/SignUp' className='p-2 hover:underline font-medium text-sm text-black mt-2 inline-block'>SignUp</Link>

                </form>
            </div>
        </div>
    )
}
export default Login
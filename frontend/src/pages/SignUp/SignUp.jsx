import GenderCheckBox from "./GenderCheckBox"

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg backdrop-filter bg-clip-padding backdrop-blur-xl bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-blue-50">SignUp
          <span className="text-green-500">Chatapp</span>
        </h1>

        <form>
          <div>
            <label className='label p-2'>
              <span className="text-base label-text">Full Name</span>
            </label>
            <input type="text" placeholder='prayash singh' className="input input-bordered w-full h-10" />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input type="text" placeholder='prayash singh' className="input input-bordered w-full h-10" />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input type="password" placeholder='Enter Password' className="input input-bordered w-full h-10" />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input type="password" placeholder='Enter Password' className="input input-bordered w-full h-10" />
          </div>

          <GenderCheckBox />

          <span className="text-base label-text">Already have and account? <a href="#" className='p-2 text-base label-text hover:underline hover:text-green-600 mt-2 inline-block'>Login</a></span>

          <div>
            <button className="btn btn-block btn-sm mt-2">SignUp</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Signup
import { Link } from "react-router-dom"
import { useState } from "react"
import useSignup from "../../hooks/useSignUp"
import ProfilePhotoSelector from '../../components/Inputs/ProfilePictureSelector'
import uploadImage from "../../hooks/useProfileImage";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);

  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    password: '',
    email: '',
    profileImageUrl: ''
  })

  const { loading, Signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImgUrl = ""

    if (profilePic) {
      const imgUploadRes = await uploadImage(profilePic);
      profileImgUrl = imgUploadRes.imageUrl || "";
    }

      const updatedInputs = {
    ...inputs,
    profileImageUrl: profileImgUrl
  };

    await Signup(updatedInputs)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="flex flex-row w-auto rounded-3xl bg-white bg-clip-padding overflow-hidden">

        <form onSubmit={handleSubmit}>
          <div className="w-[16rem] sm:w-[19rem] mx-8 my-6">
            <h2 className="text-3xl font-bold text-center pt-3 text-black">SignUp
            </h2>

            <span className="flex py-4 text-black text-sm font-medium text-center">Hey,Enter your details to start your first conversation.</span>

            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div>
              <label className="label p-1 pl-2">
                <span className="text-black font-semibold label-text">Fullname</span>
              </label>
              <input type="text" placeholder='Enter Fullname' className="input focus:outline-none bg-white text-slate-900 placeholder-gray-600 input-bordered w-full h-10"
                value={inputs.fullname}
                onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
              />
            </div>

            <div>
              <label className="label p-1 pl-2">
                <span className="text-black font-semibold label-text">Username</span>
              </label>
              <input type="text" placeholder='Enter Username' className="input focus:outline-none bg-white text-slate-900 placeholder-gray-600 input-bordered w-full h-10"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              />
            </div>

            <div>
              <label className="label p-1 pl-2">
                <span className="text-black font-semibold label-text">Email</span>
              </label>
              <input type="Email" placeholder='Enter Email' className="input focus:outline-none bg-white text-slate-900 placeholder-gray-600 input-bordered w-full h-10"
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              />
            </div>
            <div>
              <label className="label p-1 pl-2">
                <span className="text-black font-semibold label-text">Password</span>
              </label>
              <input type="password" placeholder='Enter Password' className="input focus:outline-none bg-white text-slate-900 placeholder-gray-600 input-bordered w-full h-10"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
            </div>

            <div className="pt-2">
              <button disabled={loading} className="rounded-lg bg-indigo-600 text-slate-800 font-medium bg-opacity-70 border-none btn-block btn-sm mt-2">{loading ? <span className='loading loading-spinner mx-auto'></span> :'SignUp'}</button>
            </div>
            <span className="text-slate-600">Already have an account?</span><Link to='/Login' className='p-2 text-black font-medium hover:underline label-text mt-2 inline-block'>Login</Link>
          </div>

        </form>
      </div>
    </div>
  )
}
export default Signup
import jwt from "jsonwebtoken"


  const generateTokenandCookies = (UserId,res) => {
    const token = jwt.sign({UserId},process.env.JWT_SECRET,{
        expiresIn:"15d",
    })
    res.cookie("jwt",token,{
        httpOnly:true,
    })
  }


  export default generateTokenandCookies;
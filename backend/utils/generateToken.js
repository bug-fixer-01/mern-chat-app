import jwt from "jsonwebtoken"


  const generateTokenandCookies = (UserId,res) => {
    const token = jwt.sign({UserId},process.env.JWT_SECRET,{
        expiresIn:"15d",
    })
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:false,
        sameSite:'strict',  
        // maxAge:15*24*60*60*1000,
        expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        secure:process.env.NODE_ENV !== "developement",
    })
  }


  export default generateTokenandCookies;
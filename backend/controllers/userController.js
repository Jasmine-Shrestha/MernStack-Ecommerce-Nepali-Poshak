// allow user to create account and login
import validator from "validator"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}
//user login features
//two arrow function  route for user login
const loginUser = async (req,res) => {
// we will create usercontroller login function to get the user email and pswd & if the user is genuine that we will generate token

try{
  const {email,password} = req.body;
  const user = await userModel.findOne({email});

  if (!user) {
    return res.json({success:false,message:"User doesn't exists"})
  }
  const isMatch = await bcrypt.compare(password,user.password);
  if (isMatch) {
    const token = createToken(user._id)
    res.json({success:true,token})
  }
  else {
    res.json({success:false, message: 'Invalid credentials'})
  }
} catch (error){
  console.log(error);
  res.json({success:false,message:error.message})
}
}


//route for user register
const registerUser = async (req,res) => {
  try {
    const { name, email, password } = req.body;

   
    

    // checking user already exist or not
    const exists = await userModel.findOne({email});
    if (exists) {
        return res.json({success:false, message:"User already exists"})
    }

    // validatig email format & strong password
    if (!validator.isEmail(email)) {
        return res.json({success:false, message:"Please enter a valid email"})
    }

    if (password.length < 8) {
        return res.json({success:false, message:"Please enter a strong password"})
    }

// hasing user password using bcrypt
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)

//create user
const newUser = new userModel({
    name,
   email,
 password:hashedPassword

})
//storing user database
const user = await newUser.save()


const token = createToken(user._id)

res.json({success:true,token})


  } catch (error) {

    console.log(error);
    res.json({success:false,message:error.message})
  }

}
// route for admin login
const adminLogin = async (req,res) => {
  try {
    const {email,password} = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password,process.env.JWT_SECRET);
      res.json({success:true,token})
    } else {
      res.json({success:false,message:"Invalid credentials" })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message})

  }

}

export { loginUser,registerUser, adminLogin}
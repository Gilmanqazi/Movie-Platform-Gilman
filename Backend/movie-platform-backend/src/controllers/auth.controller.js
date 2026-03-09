const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const radis = require("../config/redis")

async function registerController(req,res){

try{
  const {username,email,password} = req.body

  if(!username || !email || !password){
    return res.status(401).json({
      message:"Plz fill the all data"
    })
   }

const alreadyExist = await userModel.findOne({
$or:[
  {username},
  {email}
]
})

if(alreadyExist){
  return res.status(409).json({
    message:"User Already Exist"
  })
}

const salt = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password,salt)

const user = await userModel.create({
  username,
  email,
  password:hash,
})

const token = jwt.sign({
  id:user._id,
  username:user.username
},
process.env.JWT_SECRET ,{expiresIn:"5d"}
)

res.cookie("token", token, {
  httpOnly: true, 
  maxAge: 5 * 24 * 60 * 60 * 1000 
});

res.status(201).json({
  message:"User registration successfull",
  user
})

}catch (error) {
  console.error("Registration Error:", error);
  return res.status(500).json({
    message: "Internal Server Error",
    error: error.message
  });
}
}

async function loginController(req,res){

  const {email,password} = req.body

  if(!email || !password){
    return res.status(400).json({
      message:"Please provide both email and password"
    })
  }

  try{
    const user = await userModel.findOne({
      email
    }).select("+password")
    
    if(!user){
    return res.status(400).json({
message:("Invalid Email or Password")
      })
    }
  
    const isPassword = await bcrypt.compare(password,  user.password)
  
    if(!isPassword){
      return res.status(400).json({
        message:"Invalid Email or Password"
      })
    }
  
    const token = jwt.sign({
      id:user._id,
      username: user.username
    },
  process.env.JWT_SECRET,{expiresIn:"5d"})
  
  res.cookie("token", token, {
    httpOnly: true, 
    maxAge: 5 * 24 * 60 * 60 * 1000 
  });
  
  res.status(200).json({
    message:"Login Successfull",
    user:{
      id:user._id,
     username:user.username,
     email:user.email,
    }
  })
  
  }catch(error){
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Something went wrong on our end",
    });
  }
}


async function logOutController(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }

   
    res.clearCookie("token")
     
    await radis.set(token, Date.now(), "EX", 60 * 60);

    return res.status(200).json({
      message: "Logged out successfully"
    });

  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Error during logout" });
  }
}


async function getMe(req,res){

  const user = await userModel.findById(req.user.id)

 if(!user){
  return res.status(404).json({
    message:"User not found"
  })
 }

 res.status(200).json({
  message:"User fetched successfully",
  user
 })

}



module.exports = {
  registerController,
  loginController,
  logOutController,
  getMe,
}
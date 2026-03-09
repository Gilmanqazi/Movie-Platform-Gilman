const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:[true,"Username is already exist"],
    require:[true,"Username is required"],
    trim:true,
    lowercase:true,
    minLength: [3, 'Username must be at least 3 characters'],
  maxLength: [20, 'Username cannot exceed 20 characters'],
  match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  email:{
    type:String,
    unique:[true,"Email is already exist"],
    required:[true,"Email is required while creating an account"],
    trim:true,
    lowercase:true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,]
  },
  password:{
    type:String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false,
    trim:true,
  },
 favorites: [{ type: Object }]

})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel




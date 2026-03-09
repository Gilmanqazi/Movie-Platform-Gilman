import axios from "axios"

const api = axios.create({
  baseURL:"http://localhost:3000/api/auth",
  withCredentials:true
})


export const registerUser = async ({username,email,password})=>{
try{
  
  const res = await api.post("/register",{
    username,email,password
  })
 
  return res.data

}catch(err){
  console.log(err)
}
}

export const loginUser = async ({email,password})=>{

  try{
    const res = await api.post("/login",{
      email,password
    })
  
  return res.data
  }catch(err){
    console.log(err)
  }
}

export const getMe = async ()=>{

  const res = await api.get("/me")
 
  return res.data
}

export const logOutUser = async ()=>{
  const res = await api.post("/logout")



  return res.data
}
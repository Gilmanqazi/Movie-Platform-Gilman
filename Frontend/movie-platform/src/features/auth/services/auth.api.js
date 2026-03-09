import axios from "axios"

const api = axios.create({
  baseURL:"http://localhost:3000",
  withCredentials:true
})


export const registerUser = async ({username,email,password})=>{
try{
  
  const res = await api.post("/api/auth/register",{
    username,email,password
  })
  console.log("Api Register", res.data)

  console.log("Api Register", res.data)
  return res.data

}catch(err){
  console.log(err)
}
}

export const loginUser = async ({email,password})=>{

  console.log(email,password)

  try{
    const res = await api.post("api/auth/login",{
      email,password
    })
    console.log("Api Register", res.data)
  return res.data
  }catch(err){
    console.log(err)
  }
}

export const getMe = async ()=>{

  const res = await api.get("/api/auth/me")
 
  return res.data
}

export const logOutUser = async ()=>{
  const res = await api.post("/api/auth/logout")



  return res.data
}
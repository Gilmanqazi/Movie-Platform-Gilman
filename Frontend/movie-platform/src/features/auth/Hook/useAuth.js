import { useDispatch, useSelector } from "react-redux"
import { login, register, logout } from "../redux/authSlice"

export const useAuth = () => {

  const dispatch = useDispatch()
  const { user, loading } = useSelector(state => state.auth)

  const handleLogin = (data)=>{
    dispatch(login(data))
    console.log(data)
  }

  const handleRegister = (data)=>{
    dispatch(register(data))
    console.log(data)
  }

  const handleLogout = ()=>{
    dispatch(logout())
  }

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout
  }

}
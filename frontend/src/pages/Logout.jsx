import  { useEffect,useContext, } from 'react'
import { AuthContext } from '../store/ContextApi'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const navigate=useNavigate()
  const {logoutUser}=useContext(AuthContext)
  useEffect(()=>{
    logoutUser()
    window.location.reload()  //to refresh the application 
    navigate("/")

  })
}

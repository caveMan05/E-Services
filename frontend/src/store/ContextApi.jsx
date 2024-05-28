import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext({})

const AuthContextProvider=({children})=>{

  const [token,setToken]=useState(localStorage.getItem("token"))
  const [user,setUser]=useState("")

  const tokeninLs=(userToken)=>{
    setToken(userToken)
    localStorage.setItem("token",userToken)
  }

  const isLoggedIn=!!token

  const  logoutUser=()=>{
    setToken("")
    localStorage.removeItem("token")
  }

 
    useEffect(()=>{
      const fetchData=async()=>{
        try{
          const response=await fetch("http://localhost:5000/api/login/user",{
            method:"GET",
            headers:{
              "Authorization":`Bearer ${token}`
            }
            
          })
          const res_data=await response.json()
          //console.log(res_data)
          setUser(res_data)

        }catch(error){
          //console.log("frontend user data fetching data ")
        }
      }
      fetchData()
    },[token])
  


  return(
    <AuthContext.Provider  value={{tokeninLs,isLoggedIn,logoutUser,user,token}}>
      {children}
    </AuthContext.Provider>
  )

}
export default AuthContextProvider
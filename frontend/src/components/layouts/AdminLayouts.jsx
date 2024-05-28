import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaUser,FaHome } from "react-icons/fa";
import { GrContact , GrServices} from "react-icons/gr";
import { AuthContext } from '../../store/ContextApi';
import Error from '../../pages/Error';



export default function AdminLayouts() {
  const{user}=useContext(AuthContext)
  if(!user.isAdmin){
    return(
      <Error/>
    )
  }
  return (
    <>
      <header>
        <div className='container'>
          <nav>
            <ul>
              <li><NavLink to="/admin/users"><FaUser /> Users</NavLink></li>
              <li><NavLink to="/admin/contacts"><GrContact /> Contacts</NavLink></li>
              <li><NavLink to="/service"><GrServices /> Services</NavLink></li>
              <li><NavLink to="/"><FaHome /> Home</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet/>
    </>
  )
}

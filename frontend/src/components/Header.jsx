import { NavLink } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { AuthContext } from "../store/ContextApi";

export const Header = () => {
  const {isLoggedIn}=useContext(AuthContext)

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">DemoTechnical</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about"> About </NavLink>
              </li>
              <li>
                <NavLink to="/service"> Services </NavLink>
              </li>
              <li>
                <NavLink to="/subscription"> Subscriptions </NavLink>
              </li>
              <li>
                <NavLink to="/contact"> Contact </NavLink>
              </li>
              {(isLoggedIn)?(
                <li>
                <NavLink to="/logout"> Logout</NavLink>
              </li>

              ):(
                <>
                
                <li>
                <NavLink to="/register"> Register </NavLink>
              </li>
              

              
              <li>
                <NavLink to="/login"> Login </NavLink>
              </li>
              </>
            
              ) }
              
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
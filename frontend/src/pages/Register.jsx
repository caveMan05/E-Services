import {useState} from 'react'
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
export default function Register() {
  const navigate=useNavigate()
  const[user,setUser]=useState({
    username:"",
    email:"",
    phone:"",
    password:""
  })
  const handleInput=(e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })

  }
  const handleSubmit=async(e)=>{
    
    e.preventDefault()
    const response=await fetch("http://localhost:5000/api/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
    })
    const res_data=await response.json()
    if(response.ok){
      toast.success(res_data.message)
        navigate("/login")
    }
    else{
      toast.error(res_data.message)
    }

  }
    return (
      <>
        <section>
          <main>
            <div className="section-registration">
              <div className="container grid grid-two-cols">
                <div className="registration-image reg-img">
                  <img
                    src="/images/register.png"
                    alt="a nurse with a cute look"
                    width="400"
                    height="500"
                  />
                </div>
                <div className="registration-form">
                  <h1 className="main-heading mb-3">registration form</h1>
                  <br />
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="username">username</label>
                      <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleInput}
                        placeholder="username"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email">email</label>
                      <input
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={handleInput}
                        placeholder="email"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone">phone</label>
                      <input
                        type="number"
                        name="phone"
                        value={user.phone}
                        onChange={handleInput}
                        placeholder='phone number'
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password">password</label>
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleInput}
                        placeholder="password"
                        required
                      />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-submit">
                      Register Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </section>
      </>
    );
  };
  


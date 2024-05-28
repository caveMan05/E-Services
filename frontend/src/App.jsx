import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import { Header } from "./components/Header"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Contact from "./pages/Contact"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Error from "./pages/Error"
import AuthContextProvider from "./store/ContextApi"
import Logout from "./pages/Logout"
import AdminLayouts from "./components/layouts/AdminLayouts"
import AdminUsers from "./pages/AdminUsers"
import AdminContacts from "./pages/AdminContacts"
import AdminUpdate from "./pages/AdminUpdate"
import Footer from "./components/Footer/Footer"
import ServicesBuy from "./pages/ServicesBuy"
import Subscriptions from "./pages/Subscriptions"
function App(){
 return(
  <AuthContextProvider>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/service" element={<Services/>}/>
        <Route path="/subscription" element={<Subscriptions/>}/>
        <Route path="/buyservice/:id" element={<ServicesBuy/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="*" element={<Error/>}/>
        <Route path="/admin" element={<AdminLayouts/>} >
          <Route path="users" element={<AdminUsers/>} />
          <Route path="contacts" element={<AdminContacts/>} />
          <Route path="users/:id/edit" element={<AdminUpdate/>}/>
        </Route>
        
      </Routes>
      <Footer/>
    </BrowserRouter>
  </AuthContextProvider>
 )
}
export default App


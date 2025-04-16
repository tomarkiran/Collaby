import React, { useContext, useEffect ,useState } from 'react';
import { Context } from '../../main';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi"


const Navbar = () => {
  const [show, setShow] = useState(false);
  const {isAuthorized, setIsAuthorized , user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async()=> {
    try {
      const response = await axios.get("https://collaby.onrender.com/api/v1/user/logout", { withCredentials: true});
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);      
    }
  };
  return (
  <>
  <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
    <div className="container">
      <div className="logo">
        <img src="/logo1.png" alt="logo" />
      </div>
      <ul className={!show ? "menu" : "show-menu menu"}>
        <li>
          <Link to={"/"} onClick={()=> setShow(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to={"/collab/getall"} onClick={()=> setShow(false)}>
            ALL COLLABRATIONS
          </Link>
        </li>
        <li>
          <Link to={"/collabration/me"} onClick={()=> setShow(false)}>
            {
              user && user.role === "Collaborator" 
              ?  "INFLUENCER'S APPLICATION" 
              : "APPLIED COLLABs"}
          </Link>
        </li>
        {
          user && user.role === "Collaborator" ? (
            <>
            <li>
                <Link to= {"/collab/post"} onClick={()=> setShow(false)}>
                  POST NEW COLLABRATION
                  </Link>
            </li>
            <li>
                <Link to= {"/collab/me"} onClick={()=> setShow(false)}>
                  VIEW YOUR POST
                  </Link>
            </li>
            </>
          ) : (
           <></>
          )}
          <button onClick={handleLogout}>LOGOUT</button>
      </ul>
      <div className='hamburger'>
        < GiHamburgerMenu onClick={()=> setShow(!show)} />
      </div>
    </div>
  </nav>

  
  </>
 );  
};

export default Navbar;
// "Influencer", "Collaborator"

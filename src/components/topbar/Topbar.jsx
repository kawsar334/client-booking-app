


import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./topbar.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


import Swal from 'sweetalert2';
const Topbar = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async()=>{
        try{
            const res = await axios.post('/auth/logout');
            if(res.status===200){
                localStorage.removeItem("admin")
                Swal.fire({
                    title: res.data,
                })
                setTimeout(()=>{
                    window.location.reload();
                    navigate("/login");

                },3000)

            }
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="topbar">
        <div className="topbar_wrapper">
            <div className="topleft">
                <Link to="/">
                <span className="logo">{user?.name} </span>
                </Link>
            </div>
            <div className="topright">
                <div className="topbar_icon_container">
                      <i class="fa-solid fa-bell"></i>
                      <span className="topicon_bage">1</span>
                </div>
                  <div className="topbar_icon_container">
                      <i class="fa-solid fa-globe"></i>
                      <span className="topicon_bage">2</span>
                  </div>
                  <div className="topbar_icon_container">
                      <i class="fa-solid fa-bell"></i>
                      <span className="topicon_bage">3</span>
                  </div>
                  {
                      user && <button onClick={handleLogout}>Logout</button>
                  }
                  
                  <Link to={`/user/${user?._id}`}>
                    
                      <img src={user?.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt=""  className="topbar_img"/>
                  </Link>
            </div>
        </div>  
    </div>
  )
}

export default Topbar

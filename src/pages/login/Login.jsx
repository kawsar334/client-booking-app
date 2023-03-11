import { useEffect, useState } from "react"
import "./login.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {Link, useNavigate}  from "react-router-dom";
import Swal from 'sweetalert2'
const Login = () => {
    const navigate= useNavigate();
    const [swalProps, setSwalProps] = useState({});
    const { dispatch } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [password, setPassword ] = useState("");
   const [email, setEmail] = useState("");
    useEffect(()=>{
        Swal.fire({
            text:"Signin Now"
        })
    },[])
   
    const handleLogin = async(e)=>{
        e.preventDefault();
        try{
            dispatch({ type:"LOGIN_START"})
            const res = await axios.post("auth/login/",{email, password});
            dispatch({ type:"LOGIN_SUCCESS" , payload:res.data.others});

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.others });
            if(res.data.isAdmin ===true){
                navigate("/");
                Swal(
                    "Login successfully"
                )
                console.log("res.data.isAdmin", res.data)
            }else{
                Swal.fire(
                    {
                        text: "You are not allowed !",
                        timer:2000
                        
                    }
                    )
                    setError("You are not allowed !", )
                    navigate("/login")
            }
        }catch(err){
          
            console.log(err)
            // setError(err.response.data);
            Swal.fire({
                icon: 'error',
                title: "Oops..",
                text:"something went wrong" ,
                footer: '<a href="">Try again?</a>'
            })
            dispatch({ type:"LOGIN_FAILURE",payload:err.response.data});
        }
    }
  return (
    <div className='login'> 
        <div className="loginWrapper">
            <form action="" className="loginForm"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
            >
                <h1 className="loginHeader">Signin</h1>
                <input type="text" name="email" placeholder='Email...' onChange={(e)=>setEmail(e.target.value)}/>
                  <input type="password" name="password" placeholder='password...' onChange={(e) => setPassword(e.target.value)} />
                  {error &&<span style={{color:"crimson", }}>{error}</span>}
                  <button onClick={handleLogin}>Login</button>             
                  <Link  to="/newuser">Don't have any account? <b>Signup</b></Link>

            </form>
        </div>
    </div>
  )
}

export default Login




import { useEffect, useState } from "react";
import "./newuser.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
const NewUser = () => {
  const navigate =useNavigate();
  const [name, setName]  = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); 
  const [country, setCountry] = useState("");
  const [file, setFile] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [city, setCity] = useState("");
const [img, setImg] = useState("");


useEffect(()=>{
  Swal.fire({
    text: "Create An admin ",
    timer:1500
  })
},[])

  const handleSubmit =async(e)=>{
           e.preventDefault();
           const data = new FormData();
          data.append("file", file);
          data.append("upload_preset","upload");

          try{
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dmvmzwqkw/image/upload",data);
            console.log(uploadRes.data.url)
            setImg(uploadRes.data.url)
          
          const newUser = {
            name, email, password, phone, country, isAdmin, city, img: uploadRes.data.url
          }

          //handilng registration 
      const res = await axios.post("/auth/register/",newUser);
      console.log(res.data);
      if(res.status ===200){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: "User hasbeen created !",
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(()=>{
          navigate("/login");
        },3000);
       
      }
    }catch(err){
            console.log(err.response.data);
            Swal.fire({
              title: err.response.data.error.message || "Something went wrong",
              text: 'Do you want to continue',
              icon: 'error',
              confirmButtonText: 'ok'
            })
    }
  } 
  return (
    <div className="newuser">
        <h3 className="newUserTitle">New Admin </h3>
        <form action="" className="newUserForm">
            <div className="newUserFormLeft">
          <label htmlFor="file">
            <img src={file ? URL.createObjectURL(file):"https://images.pexels.com/photos/14341974/pexels-photo-14341974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="Loading..." className="uploadImg" />

            <i class="fa-solid fa-arrow-up"></i>Upload img </label>
          <input type="file" name="file" id="file" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])} />
                <label htmlFor="username">Username</label>
                <input type="text" name="name" id="name" placeholder="name" onChange={(e)=>setName(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="example@gmail.com" onChange={(e)=>setEmail(e.target.value)}
                 />
                 <label htmlFor="phone">Phone</label>
                 <input type="text" name="phone" id="phone" placeholder="+88172723733222"  onChange={(e)=>setPhone(e.target.value)}/>
                  <label htmlFor="country">country</label>
                  <input type="text" name="country" id="country" placeholder="Country " onChange={(e)=>setCountry(e.target.value)} />
            </div>
            <div className="newUserFormRight">
               
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
              
                <label htmlFor="city"> City</label>
                <input type="text" name="city" id="city" placeholder="city." onChange={(e)=>setCity(e.target.value)} />
               <label htmlFor="isAdmin">IsAdmin : </label>
                <select name="isAdmin" id="isAdmin" onChange={(e)=>setIsAdmin(e.target.value)}>
                <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
                <Link to="/login" >Already have an Account? <b>Signin</b></Link>
          <button className="newBtn" onClick={handleSubmit} >submit</button>
            </div>
        </form>
    </div>
  )
}

export default NewUser
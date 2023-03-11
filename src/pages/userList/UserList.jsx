
import { useContext, useEffect } from "react";
import useFetch from "../../hooks/UseFetch";
import "./userlist.css";
import axios from "axios";
import { useState } from "react";
import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2'

// https://api.cloudinary.com/v1_1/dmvmzwqkw/image/upload

const UserList = () => {
  const { data, loading, error } =  useFetch("/user/");
  const [success , setSuccess] = useState("")
  const [err, setErr] = useState("");
  const { user } = useContext(AuthContext);

  console.log(error)
  //
  useEffect(()=>{
    AOS.init();
    if(user?.isAdmin){
      Swal.fire({
        title: `${user?.name}✌`,
        text: ` You can modifie all Data.`,
       timer:2000,
      })
    }else{
      Swal.fire({
        title: `${user?.name}✌`,
        text: ` You are not allowed.`,
        timer:2000
      })
    }
  },[])


  const handleDelete = async(id)=>{
    try{
      const res = await axios.delete(`user/${id}`);
      setErr(" ")
      if(res.status===200){
        setSuccess(res.data);
        Swal.fire({
          text:"user Deleted successfully !",
          timer:1000
        })
        setTimeout(()=>{
          window.location.reload()
        },2000)

      }
      
    }catch(err){
     
      setErr("Something went Wrong!");
      if(err){

        Swal.fire({
          text: "something went wrong !",
          timer: 1000
        });
        setTimeout(() => {
          window.location.reload()
        }, 2000)

      }
    };
  }

  return (
    <div className="userList"  >
      
       {success&& <span style={{color:"green",fontSize:"20px"}}>{success}</span>}
      {err && <span style={{ color: "red", fontSize: "14px" }}>{err}</span>}

    <h1>User Lists</h1>
      <Link to="/newuser" className="addUser">
        Add User 
      </Link> 
      <table class="table table-light border ">
        <thead>
          <tr >
            <th scope="col" className="text-center" data-aos="fade-right">Id</th>
            <th scope="col" className="text-center" data-aos="fade-right">User</th>
            <th scope="col" className="text-center" data-aos="fade-right">Email</th>
            <th scope="col" className="text-center" data-aos="fade-right">isAdmin</th>
            <th scope="col" className="text-center" colSpan={2} data-aos="fade-right">action</th>
          </tr>
        </thead>
        <tbody>

          {!data ? "Loading Please wait..." : <> {data.map((item) => (
            <tr key={item._id} data-aos="fade-left">
              <th scope="row" data-aos="fade-left" >{item._id.slice(0, 5)+"..."}</th>
              <td data-aos="fade-left" ><img src={item.img} alt="" className="userIgm" /> <span>{item.name}</span></td>
              <td data-aos="fade-left">{item.email}</td>
              <td data-aos="fade-left">{item.isAdmin===false ?"No": "Yes"}</td>
              <td data-aos="fade-left"><Link to={`/user/${item._id}`}className="btn btn-primary mx-1"><i class="fa-regular fa-pen-to-square"></i></Link>
              <button className="btn btn-danger" onClick={()=>handleDelete(item._id)}><i class="fa-solid fa-trash"></i></button>
            </td>
         </tr>))} </>}
        </tbody>
      </table>
     
    </div>
  )
}

export default UserList
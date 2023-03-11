import { NavLink } from "react-router-dom"
import "./user.css";
import {useLocation ,useNavigate} from "react-router-dom";
import UseFetch from "../../hooks/UseFetch";
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthContext } from "../../context/AuthContext";

const User = () => {
    const id  = useLocation().pathname.split("/")[2] ;
    const {data, loading, error}= UseFetch(`/user/find/${id}`);
    const { user } = useContext(AuthContext);

    const [file, setFile] = useState(undefined);
    const [inputs, setInputs] = useState(undefined);
    const history = useNavigate();
    const handleChange = (e)=>{
        setInputs((prev)=>{
            return {...prev, [e.target.name]:e.target.value}
        })
    }

    useEffect(()=>{
       if(!user.isAdmin){
           Swal.fire({
               text: `You can't update ${data?.name} profile information `,
           })
       }else{

           Swal.fire({
               text: `You can update ${data?.name} profile information `,
            })
        }
    },[data])

    
    //updating user 
    const handleUpdate = async(e)=>{
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try{
            
            if(file, {...inputs}){
                const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dmvmzwqkw/image/upload", data)

                console.log(uploadRes.data.url);
                const newUser = {
                    ...inputs,
                    img: uploadRes.data.url
                }
                const res = await axios.put(`/user/${id}`,newUser );
                console.log("res.data",res.data)
                if(res.status == 200){
                    Swal.fire({
                        text: `User hasbeen updated ! `,
                    });
                    setTimeout(()=>{

                        window.location.reload();
                        history("/user");
                    },3000)
                }
            }else{
                Swal.fire({
                    text: `Please fill all these fields.  `,
                })
            }

        }catch(err){
            console.log(err)
        }
    }

   
  return (
    <div className="user">
        <div className="updatetop">
            <h3 className="updateTitle">Edit user </h3>
            <button className="updateBtn"><NavLink  to="/newuser">Add new user </NavLink></button>
        </div>
        <div className="updatetbottom">
            <div className="updateBottomLeft updateItem">
                <div className="userProfile">
                      <img src={ data.img ||
                      "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" className="userProfileImg" />
                    <div className="userProfileDes">
                        <h2 className="userprofileName">{data?.name}</h2>
                    </div>
                </div>
                <div className="userDetails">
                    <h3 className="userTitle">Account Details. </h3>
                      <p className="useritem"><b>ID:</b> {data?._id}</p>
                      {/* <p className="useritem"><i class="fa-sharp fa-solid fa-briefcase"></i>23-07-1994</p> */}
                </div>
                  <div className="userDetails">
                      {/* <h3 className="userTitle">Contact Details. </h3> */}
                      <p className="useritem"><i class="fa-solid fa-phone"></i>{data?.phone || <span style={{color:"crimson", }}>phone number not found</span>}</p>
                      <p className="useritem"><i class="fa-regular fa-envelope"></i>{data.email}</p>
                      <p className="useritem"><i class="fa-sharp fa-solid fa-briefcase"></i>{data?.country || <span style={{ color: "crimson", }}>unavailable country name</span>  }</p>

                  </div>

            </div>
              <div className="updateBottomright updateItem">
                  <form action="" className="userForm">
                      
                      <div className="userUpdateformleft">
                  <h3 className="userprofileName">Edit</h3>

                      <label htmlFor="name">name</label>
                      <input type="text" name="name" id="name" placeholder={data.name}  onChange={handleChange} required/>
                     
                      <label htmlFor="phone">phone</label>
                      <input type="text" name="phone" id="phone" placeholder={data.phone || "phone"}  onChange={handleChange} required/>
                      <label htmlFor="country">country</label>
                      <input type="text" name="" id="" placeholder={data?.country || "country"}  onChange={handleChange} required/>
                    
                      </div>
                      <div className="userUpdteFormRight">
                          <div className="userImgContainer">
                              <img src={file ?
                                  URL.createObjectURL(file)
                                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" className="userUploadImg"  />
                              <label htmlFor="file" className="uploadImg">
                                <i class="fa-solid fa-arrow-up"></i>
                                  <span>upload Image</span> </label>
                              <input type="file" name="file" id="file"style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}  required/>
                          </div>
                          <button className="userformSubmitBtn"  onClick={handleUpdate}>Update </button>
                      </div>
                  </form>
              </div>
              {/* <div className="updateBottomRight updateItem">right</div> */}

        </div>
    </div>
  )
}

export default User
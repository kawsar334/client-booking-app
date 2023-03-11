import { NavLink, useLocation, useNavigate } from "react-router-dom"
import "./product.css";
import UseFetch from "../../hooks/UseFetch";
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

const Product = () => {

const id =useLocation().pathname.split("/")[2]
const {data} = UseFetch(`/hotel/find/${id}`);
const [files, setFile] = useState(null);
const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");
const [name, setName] = useState("");
const navigate = useNavigate()


    const handleUpload =async(e)=>{
        e.preventDefault();
        try{
            
        const list =await Promise.all(Object.values(files).map(async(file)=>{
            
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dmvmzwqkw/image/upload", data);
            const { url } = uploadRes.data 
            return url;
        }));
            const newHotel = {
                title,desc,
                name,
                photos: list,
            }
        const res = await axios.put(`/hotel/${id}`,newHotel);
        if(res.status===200){
            
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Updated succesfully !',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(()=>{
                window.location.reload();
                navigate("/newproduct");

            },1000)
        }

        }catch(err){
            console.log(err)
        }


    }
  return (
    <div className="product">
          <div className="updatetop">
              <h3 className="updateTitle">Edit Prduct </h3>
              <button className="updateBtn"><NavLink to="/newproduct">Create Hotel</NavLink></button>
          </div>
          <div className="updatetbottom">
              <div className="updateBottomLeft updateItem">

                  <div className="userProfile">
                      <img src={data?.photos} alt="" className="userProfileImg" />
                      <div className="userProfileDes">
                          <h2 className="userprofileName">{data?.name} </h2>
                          <span className="userprofileTitle">{data?.city} </span>
                      </div>
                  </div>
                  <div className="userDetails">
                      <h3 className="userTitle">Product  Details. </h3>
                      <p className="useritem"><i class="fa-regular fa-user"></i> {data.desc}</p>
                      <p className="useritem"><i class="fa-sharp fa-solid fa-briefcase"></i>{data.createdAt}</p>
                  </div>
              </div>
              <div className="updateBottomright updateItem">
                  <form action="" className="userForm">

                      <div className="userUpdateformleft">
                          <h3 className="userprofileName">Edit</h3>
                          <label htmlFor="name">Product Name</label>
                          <input type="text" name="name" id="name" placeholder="prduct name" onChange={(e) => setName(e.target.value)} />
                          <label htmlFor="title">Product title</label>
                          <input type="text" name="title" id="title" placeholder="prduct title"  onChange={(e)=>setTitle(e.target.value)}/>
                          <label htmlFor="desc">Product desc</label>
                          <input type="text" name="desc" id="desc" placeholder="Product description "  onChange={(e)=>setDesc(e.target.value)}/>
                      </div>
                      <div className="userUpdteFormRight">
                          <div className="userImgContainer">
                              <img src={files ? URL.createObjectURL(files[0]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" className="userUploadImg" />
                              <label htmlFor="file"><i class="fa-solid fa-arrow-up"></i></label>
                              <input type="file" name="file" id="file" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files)} />
                          </div>
                          <button className="userformSubmitBtn" onClick={handleUpload}>Update </button>
                      </div>
                  </form>
              </div>
              {/* <div className="updateBottomRight updateItem">right</div> */}

          </div>
    </div>
  )
}

export default Product
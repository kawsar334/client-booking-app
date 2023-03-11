import { useState } from "react"
import UseFetch from "../../hooks/UseFetch";
import "./newproduct.css"
import axios from "axios";

const NewProduct = () => {
  const   {data, loading, error, } = UseFetch(`/room/`);
   const [files, setFiles] = useState("");
   const [inputs, setInputs] = useState({});
   const [rooms, setRooms] = useState([]);
    const handleInputs = (e)=>{
        setInputs((prev)=>{
            return {...prev, [e.target.name]:e.target.value}
        })
    };
        
    const handleSelect = (e)=>{
      const value =   Array.from(e.target.selectedOptions,(option)=>option.value );
      setRooms(value);
    }
    // HANDLING CLICK FUNCTION
    
    const handleClick = async(e)=>{
        e.preventDefault();
        try{
            // handling upload  multiple iimage 
        const list =await Promise.all(Object.values(files).map(async(file)=>{
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dmvmzwqkw/image/upload", data);
            const {url} = uploadRes.data
            return url ;
        }));
        const newHotel = {
            ...inputs,
            rooms,
            photos:list,
         }
            const hotelRes = await axios.post("/hotel/",newHotel)
            console.log(hotelRes.data)

        }catch(err){
            
            console.log(err.response.data);
        }
    }
  return (
      <div className="newproduct">
          <h3 className="newUserTitle">New Product </h3>
          <form action="" className="newUserForm">
              <div className="newUserFormLeft">
                  <label htmlFor="file">
                      <img src={
                          files
                              ? URL.createObjectURL(files[0])
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      } alt="Loading..." className="uploadImg" />

                      <input type="file" name="file" id="file" style={{ display: "none" }} multiple onChange={(e) => setFiles(e.target.files)} />
                      <i class="fa-solid fa-arrow-up"></i>Upload img </label>
                  <label htmlFor="name">Hotel name</label>
                  <input type="text" name="name" id="name" placeholder="Hotel name" onChange={handleInputs} />
                  <label htmlFor="title">Hotel title</label>
                  <input type="text" name="title" id="title" placeholder="Hotel title"  onChange={handleInputs}/>

                  <label htmlFor="type">type</label>
                  <input type="type" name="type" id="type" placeholder="type" onChange={handleInputs}
                  />
                  <label htmlFor="city">city</label>
                  <input type="city" name="city" id="city" placeholder="city" onChange={handleInputs}
                  />
                  <label htmlFor="address">Address</label>
                  <input type="address" name="address" id="address" placeholder="address" onChange={handleInputs}
                  />
                  <label htmlFor="cheapestPrice">Price</label>
                  <input type="number" name="cheapestPrice" id="cheapestPrice" placeholder="Enter price.."  onChange={handleInputs}/>
              </div>
              <div className="newUserFormRight">
                  <label htmlFor="distance">distance</label>
                  <input type="text" name="distance" id="distance" placeholder="Distance" onChange={handleInputs} />
                  <label htmlFor="desc"> desc</label>
                  <input type="text" name="desc" id="desc" placeholder="desc ."  onChange={handleInputs}/>
                  <label htmlFor="featured">Featured property </label>
                  <select name="featured" id="featured" onChange={handleInputs}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                 </select>
                 <label htmlFor="rooms">Rooms</label>
                  <select name="rooms" id="rooms" multiple onChange={handleSelect}>
                     {data.map((room)=>(
                      <option value={room._id} key={room._id}>{room.title}</option>
                     ))}
                  </select>

                  <button className="newBtn" onClick={handleClick} >submit</button>
              </div>
          </form>
      </div>
  )
}

export default NewProduct
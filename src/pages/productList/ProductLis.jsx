import "./productlist.css";
import {Link} from "react-router-dom";
import UseFetch from "../../hooks/UseFetch";
import axios from "axios";
import Swal from 'sweetalert2'
import { useEffect } from "react";
const ProductLis = () => {
    const { data, loading, error, } = UseFetch(`/hotel/`);
    const handleDelete = async(id)=>{
        try{
            const res = await  axios.delete(`/hotel/${id}`);
            Swal.fire({
                text:res.data,
                timer:2000
            });
          
        }catch(err){
            Swal.fire({
                text: err.res.data,
                timer: 2000
            });

            console.log(err.response.data);
        };
    }

    useEffect(()=>{
        Swal.fire({
            text:"Hotels",
            timer:1500
        })
    })
  return (
    <div className="productlist">
          <Link to="/newproduct" className="addbtn">
            Add New Hotel
        </Link>
        <h3>product list</h3>
          <table class="table table-light border text-center my-5 ">
              <thead>
                  <tr >
                      <th scope="col" className="text-center">Id</th>
                      <th scope="col" className="text-center">name</th>
                      <th scope="col" className="text-center">stock</th>
                      <th scope="col" className="text-center">price</th>
                      <th scope="col" className="text-center" colSpan={2}>action</th>


                  </tr>
              </thead>
              <tbody>
                 {data.map((item)=>( <tr key={item._id}>
                      <th scope="row">{item._id}</th>
                      <td><img src={item.photos[0]} alt="" className="productImg" /> <span>{item.name}</span></td>
                      <td>{item.featured===true? "Yes": "no"}</td>
                      <td className="userTrasaction">${item.cheapestPrice}</td>
                      <td><a href={`/product/${item._id}`} className="btn btn-primary mx-1"><i class="fa-regular fa-pen-to-square"></i></a>
                       <button className="btn btn-danger" onClick={()=>handleDelete(item._id)}><i class="fa-solid fa-trash"></i></button>
                      </td>
                 </tr>)) }



              </tbody>
          </table>
    </div>
  )
}

export default ProductLis
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios";

const UseFetch =(url)=>{
const [data, setData] = useState([]);
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);


    useEffect(()=>{
        setLoading(true)
        const getData=async()=>{
            try{
                const res = await axios.get(url);
                setLoading(false);
                setData(res.data);
              
            }catch(err){
                setError(err);
            }
        }
        getData();
    },[url]);

    const refetch = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url)
            setData(res.data);
            setLoading(false);
        } catch (err) {
            setError(err);
        }
    };

    
    return { data, loading, error, refetch };
    
}


export default UseFetch ;
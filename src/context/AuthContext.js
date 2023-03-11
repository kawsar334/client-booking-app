import { createContext, useEffect } from "react";
import { useReducer } from "react";

const initialState = {
    user:JSON?.parse(localStorage?.getItem("admin")) || null,
    loading:false,
    error:null,
};


export const AuthContext = createContext(initialState);

const authReducer = (state, action)=>{
    switch(action.type){
        case "LOGIN_START":
            return{
                loading:true,
                error:false
            }
        case "LOGIN_SUCCESS":
            return {
                user:action.payload,
                loading:false,
                error:false
            }
        case "LOGIN_FAILURE":
            return {
                user:null,
                loading:false,
                error:action.payload
            }
        default :
        return state ;
    }
};


const AuthProvider = ({children})=>{
const [state, dispatch] = useReducer(authReducer, initialState);

useEffect(()=>{
    localStorage?.setItem("admin", JSON.stringify(state.user));

},[state.user]);

    return(
        <AuthContext.Provider value={{
            user:state.user,
            loading:state.loading,
            error:state.loading,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    )
};
export default  AuthProvider ;
import { createContext, useReducer } from "react";


const initialState = {
    city:undefined,
    dates:[],
    options:{
        adult:undefined,
        children:undefined,
        room:undefined,
    }
};
export const SearchContext = createContext(initialState);
const SearchReducer = (state, action)=>{
    switch(action.type){
        case "NEW_SEARCH":
            return action.payload 
        case "RESET_SEARCH":
            return initialState;
        default :
        return state 
    }
}


const SearchContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(SearchReducer, initialState)


    return (
        <SearchContext.Provider value={{
            city:state.city,
            options:state.options,
            dates:state.dates,
            dispatch,
        }}>

            {children}
        </SearchContext.Provider>
    )
};

export default SearchContextProvider ;
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants"
import axios from "axios";
export const login=(email,password)=>async(dispatch)=>{
    try {
    dispatch({type:USER_LOGIN_REQUEST});

        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
       
        const { data } = await axios.post("/api/users/login", {email,password}, config);
        // console.log(data);
        dispatch({type:USER_LOGIN_SUCCESS,payload:data});
        localStorage.setItem("userInfo", JSON.stringify(data));
        
      } catch (error) {
        
        dispatch({type:USER_LOGIN_FAIL,payload:error.response.data.message})
      }
}
export const logout=()=>async(dispatch)=>{
    localStorage.removeItem("userInfo");
    dispatch({type:USER_LOGOUT});
}

export const register=(name,email,password,pic)=>async(dispatch)=>{
    try {
        dispatch({type:USER_REGISTER_REQUEST});
        const config={header:{"Content-type":"application/json"}}
        
        const {data}=await axios.post("/api/users",{name,email,password,pic},config);
        // console.log(data);
        // localStorage.setItem("userRegiseter",JSON.stringify(data));

        dispatch({type:USER_REGISTER_SUCCESS,payload:data});
        dispatch({type:USER_LOGIN_SUCCESS,payload:data})

        localStorage.setItem("userInfo",JSON.stringify(data));

        
 } catch (error) {
    // setError(error.response.data.message);
    // setLoading(false);
    dispatch({type:USER_REGISTER_FAIL,payload:error.response.data.message});
 }

}
export const updateUser=(user)=>async(dispatch,getState)=>{
  try {
    dispatch({type:USER_UPDATE_REQUEST});
    console.log(user)
     const {userLogin:{userInfo}}=getState();
     const config={
      headers:{
        "Content-type":"application/json",
        Authorization:`Bearer ${userInfo.token}`
      }
     };
     
     const {data}=await axios.post("/api/users/myprofile",user,config);
     dispatch({type:USER_UPDATE_SUCCESS,payload:data});
     dispatch({type:USER_LOGIN_SUCCESS,payload:data});
     localStorage.setItem("userInfo",JSON.stringify(data));
    
  } catch (error) {
    dispatch({type:USER_UPDATE_FAIL,payload:error.response.data.message})
  }
}
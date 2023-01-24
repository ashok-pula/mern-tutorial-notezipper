import axios from "axios";
import { NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS, NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS, NOTE_DELETE_FAIL, NOTE_DELETE_REQUEST, NOTE_DELETE_SUCCESS, NOTE_UPDATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS } from "../constants/notesConstants"

export const listNotes=()=>async(dispatch,getState)=>{
    
    try {
        dispatch({type:NOTES_LIST_REQUEST});

        const {userLogin:{userInfo}}=getState();
        const config={headers:{
            Authorization:`Bearer ${userInfo.token}`
        }};
        const {data}=await axios.get("/api/notes",config);
        // console.log(data)
        dispatch({
            type:NOTES_LIST_SUCCESS,
            payload:data,
        })

        
    } catch (error) {
        dispatch({type:NOTES_LIST_FAIL,payload:error.response.data.message})
    }
}
export const CreateNoteAction=(title,content,category)=>async(dispatch,getState)=>{
    try {
        dispatch({type:NOTE_CREATE_REQUEST});
        const {userLogin:{userInfo}}=getState();
        // console.log(userInfo);
        // const config={
        //     header:{
        //         "Content-type":"application/json",
        //         Authorization:`Bearer ${userInfo.token}`,
        //     }
        // };
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization:`Bearer ${userInfo.token}`,
            },
          };
         
        console.log(config)
        const {data}=await axios.post('/api/notes/create',{title,content,category},config);
        console.log(data);
        dispatch({
            type:NOTE_CREATE_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({type:NOTE_CREATE_FAIL,payload:error.response.data.message});
        
    }
}
export const updateNoteActions=(id,title,content,category)=>async(dispatch,getState)=>{
    try {
        dispatch({type:NOTE_UPDATE_REQUEST});
        const {userLogin:{userInfo}}=getState();
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization:`Bearer ${userInfo.token}`,
            },
          };
        const {data}=await axios.put(`/api/notes/${id}`,{title,content,category},config);

          dispatch({
            type:NOTE_UPDATE_SUCCESS,
            payload:data
          })
        
    } catch (error) {
        dispatch({type:NOTE_UPDATE_FAIL,payload:error.response.data.message})
    }
}
export const deleteNoteAction=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({type:NOTE_DELETE_REQUEST});
        const {userLogin:{userInfo}}=getState();
        const config = {
            headers: {
              
              Authorization:`Bearer ${userInfo.token}`,
            },
          };
        const {data}=await axios.delete(`/api/notes/${id}`,config);
        dispatch({
            type:NOTE_DELETE_SUCCESS,
            payload:data
        })

        
    } catch (error) {
        dispatch({type:NOTE_DELETE_FAIL,payload:error.response.data.message});
    }
}
import { NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS, NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS, NOTE_DELETE_FAIL, NOTE_DELETE_REQUEST, NOTE_DELETE_SUCCESS, NOTE_UPDATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS } from "../constants/notesConstants";

export const notesListReducer=(state={notes:[]},action)=>{
    switch(action.type){
        case NOTES_LIST_REQUEST:
            return {loading:true}
        case NOTES_LIST_SUCCESS:
            return {loading:false,notes:action.payload}
        case NOTES_LIST_FAIL:
            return {loading:false,error:action.payload}
        default: return state;
    }
}
export const noteCreateReducer=(state={},action)=>{
    switch(action.type){
        case NOTE_CREATE_REQUEST:
            return {loading:true}
        case NOTE_CREATE_SUCCESS:
            return {loading:false,success:true}
        case NOTE_CREATE_FAIL:
            return {loading:false,success:false,error:action.payload}
        default: return state
    }
}
export const  updateNoteReducer=(state={},action)=>{
    switch(action.type){
        case NOTE_UPDATE_REQUEST:
            return {loading:true}
        case NOTE_UPDATE_SUCCESS:
            return {loading:false,success:true}
        case NOTE_UPDATE_FAIL:
            return {loading:false,success:false,error:action.payload}
        default: return state;
    }
}

export const  deleteNoteReducer=(state={},action)=>{
    switch(action.type){
        case NOTE_DELETE_REQUEST:
            return {loading:true}
        case NOTE_DELETE_SUCCESS:
            return {loading:false,success:true}
        case NOTE_DELETE_FAIL:
            return {loading:false,success:false,error:action.payload}
        default: return state;
    }
}

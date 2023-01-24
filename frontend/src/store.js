import {createStore ,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducers, userUpdateReducer } from './reducers/userReducers';
import { deleteNoteReducer, noteCreateReducer, notesListReducer, updateNoteReducer } from './reducers/notesListReducer';

const reducer=combineReducers({
    userLogin:userLoginReducer,
    userRegister:userRegisterReducers,
    noteList:notesListReducer,
    noteCreate:noteCreateReducer,
    updateNote:updateNoteReducer,
    deleteNote:deleteNoteReducer,
    userUpdate:userUpdateReducer,
});
const userInfoFromStorage=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null;

const intialState={
    userLogin:{userInfo:userInfoFromStorage}
};
const middleware=[thunk];

const store=createStore(reducer,intialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

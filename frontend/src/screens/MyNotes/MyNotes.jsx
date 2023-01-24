import React from "react";
import {useEffect} from 'react';
import {
  Accordion,
  Badge,
  Button,
  Card,
  useAccordionButton,
} from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from '../../components/Loading';

// import notes from "../data/notes";
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return <span onClick={decoratedOnClick}>{children}</span>;
}

const MyNotes = ({search}) => {

  // const [notes1,setNotes]=useState([]);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const noteList=useSelector(state=>state.noteList);
  // console.log(noteList.notes)
  // const notes=noteList.notes;
  const {loading,error,notes}=noteList;
  console.log(notes);

  const userLogin=useSelector(state=>state.userLogin);
  const {userInfo}=userLogin;
  const noteCreate=useSelector(state=>state.noteCreate);
  const {success:createsuccess}=noteCreate;
  const updateNote=useSelector(state=>state.updateNote);
  const {success:updatesuccess}=updateNote;
  const deleteNote=useSelector(state=>state.deleteNote);
  const {loading:deleteloading,error:deleteerror,succes:deletesuccess}=deleteNote;

  const userUpdate=useSelector(state=>state.userUpdate);
  const {success:userUpdateSuccess}=userUpdate;
  

  
  useEffect(() => {
   
    dispatch(listNotes());
    if(!userInfo){
    navigate("/");
    }
  
    
  }, [userInfo,dispatch,navigate,createsuccess,updatesuccess,deletesuccess,deleteloading,userUpdateSuccess])
  

  
  
  const deleteHandler = (id) => {
    if (window.confirm("are you sure?")) {
      console.log(id);
      dispatch(deleteNoteAction(id));
       console.log(deleteerror)

    }
  };
  return (
    <div>
      <MainScreen title={`Welcome back ${userInfo.name.toUpperCase()}..`}>
        <Link to="/createnote">
          <Button size="lg" style={{ marginLeft: 10, marginBottom: 6 }}>
            Create New Note
          </Button>
        </Link>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {deleteerror && <ErrorMessage variant="danger">{deleteerror}</ErrorMessage>}
        {loading && <Loading/>}
        {/* {deleteloading && <Loading/>} */}

        {notes?.reverse().filter(ft=>ft.title.toLowerCase().includes(search.toLowerCase())).map((note) => (
          <Accordion key={note._id} defaultActiveKey="0">
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <CustomToggle eventKey="0"> {note.title}</CustomToggle>
                </span>

                <div>
                  <Button href={`/notes/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse  eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge bg="success" variant="success">
                      Category - {note.category}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">--created on {" "}
                  <cite>{note.createdAt.substring(0,10)}</cite>
                  </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
      </MainScreen>
    </div>
  );
};

export default MyNotes;

// import React from 'react'

// const MyNotes = () => {
//   return (
//     <div>MyNotes</div>
//   )
// }

// export default MyNotes
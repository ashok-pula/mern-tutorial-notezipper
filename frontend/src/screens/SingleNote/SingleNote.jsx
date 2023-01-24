import axios from 'axios';
import React ,{useState,useEffect} from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { deleteNoteAction, updateNoteActions } from '../../actions/notesActions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen'

const SingleNote = (props) => {
    const [title, setTitle] = useState(" ");
    const [content, setContent] = useState(" ");
    const [category, setCategory] = useState(" ");
    const [date,setDate]=useState(" ");
    const dispatch=useDispatch();
   
    const useparams=useParams();
    const navigate=useNavigate();
    const updateNote=useSelector(state=>state.updateNote);
    const {loading,error}=updateNote;


    useEffect(() => {
        const fetch=async()=>{
        const {data}=await axios.get(`/api/notes/${useparams.id}`);
        // console.log(data)
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setDate(data.createdAt);
        }
        fetch();
    }, [useparams.id,date])
    
    const submitHanlder=e=>{
        e.preventDefault();
      const {id}=useparams;
      console.log(id)
      dispatch(updateNoteActions(id,title,content,category));
      if(!title || !content || !category) return;

      navigate("/mynotes");

    }  
     const deleteNote=id=>{

       if( window.confirm("Are you sure")){
        dispatch(deleteNoteAction(id));
        navigate("/mynotes");
       }

     }
  return (
    <MainScreen title="Edit Note">
        <Card>
            <Card.Header>Edit your note</Card.Header>
            <Card.Body>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form onSubmit={submitHanlder}>
                    <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder='Enter your title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId='content'>
                        <Form.Label>Content</Form.Label>
                        <Form.Control type="text" placeholder='Enter your content'  value={content} onChange={e=>setContent(e.target.value)}/>
                    </Form.Group><Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder='Enter your category' value={category} onChange={e=>setCategory(e.target.value)} />
                    </Form.Group>
                    {loading && <Loading size={50}/>}
                    <Button  className="mt-3" type="submit" variant='primary'>Update Note</Button>
                    <Button className="mt-3 mx-2" variant="danger" onClick={()=>deleteNote(useparams.id)}>Delete Note</Button>
                </Form>
            </Card.Body>
            <Card.Footer className="text-mute">
                update on { date.substring(0,10)}
            </Card.Footer>
        </Card>
    </MainScreen>
  )
}

export default SingleNote
import React,{useState} from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import MainScreen from '../../components/MainScreen';
import { CreateNoteAction } from '../../actions/notesActions';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';

const CreateNote = () => {
    const [title, setTitle] = useState(" ");
    const [content,setContent]=useState(" ");
    const [category,setCategory]=useState(" ");
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const noteCreate=useSelector(state=>state.noteCreate);
    const {loading,error}=noteCreate;
    
    const resetHandler=()=>{
        setTitle(" ");
        setContent(" ");
        setCategory(" ");
    }
    const submitHandler=e=>{
        e.preventDefault();
        console.log("Ashok");
        dispatch(CreateNoteAction(title,content,category));
        if(!title || !content || !category) return;

        resetHandler();
        navigate("/mynotes");


    }
  return (
    <MainScreen title="Create Note ">
    <Card>
        <Card.Header>Create a New Note</Card.Header>
        <Card.Body>
            <Form onSubmit={submitHandler}>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form.Group controlId="title">
                    <Form.Label>Tittle</Form.Label>
                    <Form.Control type="text" placeholder='Enter Note Title'  value={title} onChange={e=>setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" placeholder='Enter Note Content' value={content} onChange={e=>setContent(e.target.value)}/>
                </Form.Group>  
                {content && <Card>
                    <Card.Header>
                        Note preview</Card.Header>
                        <Card.Body>
                            <ReactMarkdown>{content}</ReactMarkdown>
                            </Card.Body></Card>}
                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder='Enter Note Category' value={category} onChange={e=>setCategory(e.target.value)}/>
                </Form.Group>
                {loading && <Loading size={50}/>}
               
                <Button className='mt-3' type="submit" varinat="primary">Create Note</Button>
                <Button className="mx-2 mt-3" variant="danger" onClick={resetHandler}>Reset Fields</Button>
                
                
            </Form>

        </Card.Body>
        <Card.Footer className='text-muted'>
            Creating on {new Date().toLocaleDateString()}

        </Card.Footer>
    </Card>
    
</MainScreen>
  )
}

export default CreateNote

import React, { useRef, useState,useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";

const RegisterScreen = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  
  });
  const [pic, setPic] = useState("https://res.cloudinary.com/dturufwfz/image/upload/v1674209720/tkizaer68qzepkvho4zq.png")
  const [message, setMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [picMessage, setPicMessage] = useState(null)
  const ref=useRef();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const userRegister=useSelector(state=>state.userRegister);
  const {loading,error,userInfo}=userRegister;
  useEffect(()=>{
    if(userInfo){
      navigate("/mynotes");
    }
  },[userInfo,navigate])
  const postDetails=(pic)=>{
    if(!pic){
      return setPicMessage("please select an image");
    
    }
    if(pic.type==="image/png" || pic.type==="image/jpeg"){

      const data=new FormData();
      data.append("file",pic);
      data.append("upload_preset","notezipper");
      data.append("cloud_name","dturufwfz");
      fetch("https://api.cloudinary.com/v1_1/dturufwfz/image/upload",{
        method:"post",
        body:data,
      }).then(res=>res.json()).then(data=>{
        // console.log(data.url);
        console.log(data.url.toString());
        setPicMessage(null);

        setPic(data.url.toString());
      }).catch(err=>console.log(err))

    }
    else{setPicMessage("Please select correct format")}


    
  }

  const changeHandler=e=>{
    const {name,value}=e.target;
    setInput({...input,[name]:value});
    // console.log(input)
  }
  const submitHandler=async(e)=>{
    e.preventDefault();
    console.log(input);
    const {name,email,password,confirmPassword}=input;

    if(password !==confirmPassword){
      setMessage("passwords do not match");
    }
    else{
      setMessage(null);
      dispatch(register(name,email,password,pic));
     

    }
    setInput({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""});
        // setPic(null);
      ref.current.value="";

  }
  return (
    <MainScreen title="REGISTER">
      <div className="registerContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading/>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="Basicname">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"  autoComplete="off"
              name="name"
              value={input.name}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Basicemail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email" autoComplete="off"
              name="email"
              value={input.email}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Basicpassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={input.password}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmpassword">
            <Form.Label>Cofirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={changeHandler}
            />
          </Form.Group>
          {picMessage&&<ErrorMessage variant="danger">{picMessage}</ErrorMessage>}


          <Form.Group className="mb-3" controlId="Basicname">
            <Form.Label>Profile Picture</Form.Label>
            <br></br>
            <input
              type="file"
              ref={ref}
              lable="Upload Profile Picture"
              name="pic"
              id="custom-file"
              
              onChange={(e)=>postDetails(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <Row className="py-3">
        <Col>Already Customer ? <Link to="/login">Login Here</Link> </Col>
    </Row>
    </MainScreen>
  );
};

export default RegisterScreen;

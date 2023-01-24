import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./LoginScreen.css";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import { useState } from "react";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useSelector ,useDispatch} from "react-redux";
import { login } from "../../actions/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const dispatch=useDispatch();
  const navigate=useNavigate();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const userLogin=useSelector(state=>state.userLogin);
  const {loading,error,userInfo}=userLogin;

  useEffect(() => {
    if(userInfo){
      navigate("/mynotes");
    }
  }, [userInfo,navigate])
  
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(input.email,input.password));
   
    setInput({
      email: "",
      password: "",
    });
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={input.email}
              autoComplete="off"
              name="email"
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={input.password}
              name="password"
              onChange={changeHandler}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>{" "}
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;

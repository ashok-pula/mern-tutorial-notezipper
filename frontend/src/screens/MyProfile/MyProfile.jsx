import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../actions/userActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import "./MyProfile.css";

const MyProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picMessage, setPicMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    // setName(userInfo.)
    console.log(userInfo)
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPic(userInfo.pic);
    console.log(userInfo.pic);
  }, [userInfo, navigate]);
  const postDetails = (pic) => {
    if (!pic) {
      return setPicMessage("please select an image");
    }
    if (pic.type === "image/png" || pic.type === "image/jpeg") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dturufwfz");
      fetch("https://api.cloudinary.com/v1_1/dturufwfz/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.url);
          console.log(data.url.toString());
          setPicMessage(null);

          setPic(data.url.toString());
        })
        .catch((err) => console.log(err));
    } else {
      setPicMessage("Please select correct format");
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name, email, password, pic }));
  };
  return (
    <MainScreen title="Edit My Profile">
      <Row className="profileContainer">
        <Col md={6}>
          <div>
            {loading && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {success && (
              <ErrorMessage variant="success">
                Updated Successfullly
              </ErrorMessage>
            )}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="enter your title"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter your email"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="enter your password"
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="enter your confirm Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Basicname">
                {picMessage && (
                  <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )}
                <Form.Label>Profile Picture</Form.Label>
                <br></br>
                <input
                  type="file"
                  lable="Upload Profile Picture"
                  name="pic"
                  id="custom-file"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </div>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img style={{ borderRadius: "50%" }}   className="profilePic"  src={pic} alt="pic" />
        </Col>
      </Row>
    </MainScreen>
  );
};

export default MyProfile;

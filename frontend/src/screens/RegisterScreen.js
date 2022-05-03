import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer.js";
const RegisterScreen = ({ location, history }) => {
  //component level state for form fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState();

  // dispatch -
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  //from userRegister need loading,err and userInfo
  const { loading, error, userInfo } = userRegister;
  // does url query search exist, if so turn into array split on = sign, index 1  or go to "/"
  const redirect = location.search ? location.search.split("=")[1] : "/";
  // if already logged in should not go to the register page
  useEffect(() => {
    // it there is user info you ar logged in
    if (userInfo) {
      // props.history push to redirect
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <>
      <FormContainer>
        <h1>Sign Up </h1>
        {/* check for register on submit error  */}
        {message && <Message variant="danger">{postMessage}</Message>}
        {/* check for errors loading */}
        {error && <Message variant="danger">{error}</Message>}

        {loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control
              type="confirmPassword"
              placeholder="Re enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            {/* redirect or just register */}
            Have an account ?{" "}
            <Link to={redirect ? `/login?redirect={redirect}` : `/login`}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;

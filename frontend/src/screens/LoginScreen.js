import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer.js";
// will need location from props
const LoginScreen = ({ location }) => {
  //component level state for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // dispatch -
  const dispatch = useDispatch();
  // get from app level or redux state the user login part of state
  const userLogin = useSelector((state) => state.userLogin);
  //from userLogin need loading,err and userInfo
  const { loading, error, userInfo } = userLogin;
  // does url query search exist, if so turn into array split on = sign, index 1  or go to "/"
  const redirect = location.search ? location.search.split("=")[1] : "/";
  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    //TODO dispatch login
  };
  return (
    <>
      <FormContainer>
        <h1>Sign in </h1>
        <Form onSubmit={submitHandler}>
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
          <Button type="submit" variant="primary">
            Sign In{" "}
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            {/* redirect or just register */}
            New Customer ?{" "}
            <Link to={redirect ? `/register?redirect={redirect}` : `/register`}>
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;

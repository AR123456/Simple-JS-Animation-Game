import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { login } from "../actions/userActions";

const LoginScreen = () => {
  //component level state for form feilds
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return <div>Here is the login screen </div>;
};

export default LoginScreen;

// useEffect is where we want to dispatch from cart
// as long as there is a product id in the URL we
// want to add it to cart
import React, { useEffect } from "react";
// deal with redux state
import { useDispatch, useSelector } from "react-redux";
// need links from react router dom
import { Link } from "react-router-dom";
//bootstrap stuff
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

// handling alters and messages
import Message from "../components/Message.js";
// redux actions for this screen
import { addToCart } from "../actions/cartActions.js";

const CartScreen = () => {
  return (
    <div>
      <h1>CartScreen</h1>
    </div>
  );
};

export default CartScreen;

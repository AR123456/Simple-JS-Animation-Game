// useEffect is where we want to dispatch from cart as long as there is
//a product id in the URL we want to add it to cart
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
// passing in props to CartScreen getting product id from match.params.id
// from the URL as well as location to get the quantity and history to redirect
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  // the query params
  // check for qty and if there is, it looks like this "?qty=1" so doing split on
  // the = sign.  This creates an array with qty at first index and whatever
  // number is in the second index.  Need the number so getting index 1
  // else the qty is 1 , the type of 1 is a string so make it into
  // number by wrapping in Number()
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  //define dispatch so we can call an action
  const dispatch = useDispatch();
  // use effect - only want to dispatch ADD_TO_CART if there is a product to add
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return (
    <div>
      <h1>CartScreen</h1>
    </div>
  );
};

export default CartScreen;

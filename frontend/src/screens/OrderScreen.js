import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails } from "../actions/orderActions";
// Note all of this is comming from the DB
//TODO why is order items 0?
//TODO lots of errors in the address had to reload page for this to work
//TODO refactor using methond from Q&A lec 60 part to store the item
//price in DB and pull from there
// need match to ___ f order id from _____
const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  // sending order down through state
  const { order, loading, error } = orderDetails;
  //TODO refactor using methond from Q&A lec 60 part to store the item- pull from db ?
  if (!loading) {
    //   Calculate prices
    //TODO look at using the Javascript Internationalzation API to format currency
    // funtion so we are showing in dollar format
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    // calculate prices - using redux reducer - which takes in a accumulater and item
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  //
  useEffect(() => {
    // here we want to dispatch action
    dispatch(getOrderDetails(orderId));
  }, []);

  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              {/*  pulling user name from order to display here can do this because on back 
              end we joined useing .populate */}
              <p>
                {" "}
                <strong>Name: {order.user.name}</strong>
              </p>

              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} ,
                {order.shippingAddress.USState} ,
                {order.shippingAddress.postalCode} ,{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {/* TODO is there a use case to add payment method to local storage ?  */}
                {/* TODO look at Q&A sect9, 55 tip on adding to local storage */}
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {/* show what is in order or that order is empty  */}
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    // for each order item do this and need an index
                    // TODO this should not be index but item.product see course notes section 9 Q&A pt55
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;

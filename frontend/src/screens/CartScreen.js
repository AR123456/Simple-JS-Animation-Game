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
import { addToCart, removeFromCart } from "../actions/cartActions.js";
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
  // useSelector to get items and put them into the cart
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // use effect - only want to dispatch ADD_TO_CART if there is a product to add
  // this gets stuff from url local storage and into state for store.js the useSelector()
  // is putting into cart
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  // need a reducer for this to to cartReducers.js
  const removeFromCartHandler = (id) => {
    // dispatch the removeFromCart action
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    // here redirecting to log in if not logged in else to to  shipping
    history.push("/login?redirect=shipping");
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty<Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {/* spread operator and array constructor takes in product.countInStock  */}
                        {/* want keys from it so .keys() map  take the iterator x and add 1 for items in stock */}
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                {/* reduce() takes in an accumulator and the current item 
                take the acc and add the current quantity of items.  want it to start as 0
                */}
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                {/* show total price reduce() accumulator starts at 0 add item quantity * item price
                toFixed to make it a 2 point since it is money  */}
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  {" "}
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={8}> </Col>
      </Row>
    </>
  );
};

export default CartScreen;

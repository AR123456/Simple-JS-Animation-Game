import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
// need to pass in match for the search logic
const HomeScreen = ({ match }) => {
  // check for keyword using match - not getting an id here, getting keyword
  // may be nothing or may be a keyword - whatever it is we are passing
  // into list products
  const keyword = match.params.keyword;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;
  useEffect(() => {
    // passing in keyword - need to account for this in list products actions
    // in productActions.js
    dispatch(listProducts(keyword));
    // add keyword as dependancy
  }, [dispatch, keyword]);

  return (
    <>
      <h1>Products</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={5} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;

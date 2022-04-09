import React, { useEffect } from "react";
// import dispatch and selector
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
// import the action
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  //setting const dispatch to useDispatch. using hooks here
  const dispatch = useDispatch();
  // call this what you did is store.js
  // useSelector takes in and arrow with state and a function and what
  // part of state we want
  const productList = useSelector((state) => state.productList);
  // destructure and pull out what we want from the productList
  const { loading, error, products } = productList;
  useEffect(() => {
    //fire off list products -make request to back end to get products
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={5} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;

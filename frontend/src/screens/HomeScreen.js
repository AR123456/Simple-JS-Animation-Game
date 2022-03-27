import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
// import products from "../products";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // cannot make useEffect itself async await so creating function within it that is
    // set as async
    const fetchProducts = async () => {
      // res.data deconstructed
      // await getting from api
      const { data } = await axios.get("/api/products");
      // after fetching products call setProducts that we defined in useState
      setProducts(data);
    };
    // call function while still in useEffect
    fetchProducts();
    //as a second argument to use effect, pass in an array of dependencies that is anything
    // that you want to fire use effect off when it changes for now none
  }, []);
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

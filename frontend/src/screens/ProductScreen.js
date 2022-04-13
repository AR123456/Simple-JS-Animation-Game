import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
// import products from "../products";
import axios from "axios";
import { listProducts } from "../actions/productActions";

const ProductScreen = ({ match }) => {
  // no longer getting from front end , use axixo
  // const product = products.find((p) => p._id === match.params.id);
  // console.log(product);
  // products is an object {} not [] in useState
  // const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const listProductDetails = useSelector((state) => state.listProductDetails);
  const { loading, error, product } = listProductDetails;

  useEffect(() => {
    dispatch(listProductDetails());
    //
    // const fetchProduct = async () => {
    //   // get product ID form the url , already passing match in so
    //   const { data } = await axios.get(`/api/products/${match.params.id}`);
    //   setProduct(data);
    // };
    // fetchProduct();
  }, [dispatch]);
  return (
    <div>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;

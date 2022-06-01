import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.userList);
  const { loading, error, orders } = orderList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      //TODO dispathc listORders
      console.log("admin");
    } else {
      //TODO is this the best place to push back to ?
      history.push("/");
    }
  }, [dispatch, history, userInfo]);
  return (
    <>
      <h1>Orders </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Order</th>
            </tr>
          </thead>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.user._id}</td>
              <td>{order.user.name}</td>
              <td>{order}</td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;

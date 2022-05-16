import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//@desc Create New order
//@route POST/api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  // destructue
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  // check orderItems and if empty send error back to front end
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    //  -instantiate a new order
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    // save the order to the DB
    //TODO where is validation that bad actor did not change
    // the prices or num of items or other malicous stuff
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc get order by ID
//@route GET/api/orders/:id
//@access Private
//TODO improve the security of this route by checking if admin or user sect58 Ch10 Q&A
const getOrderById = asyncHandler(async (req, res) => {
  // fetch the order - getting from URL - so params
  // also need the name and user info of the user placing the order .populate()
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  // check to see if order exits if not throw error.
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found ");
  }
});

//@desc update order to paid
//@route GET/api/orders/:id/pay
//@access Private
//TODO improve the security of this route by checking if admin or user sect58 Ch10 Q&A
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //getting from URL - so params
  const order = await Order.findById(req.params.id);
  // check to see if order exits if not throw error.
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // this will come from  from paypal payer object
    //TODO other payment API would be difrent
    // set properties
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    // const to save it in the DB -updated not update
    // const updateOrder = await order.save();
    // res.json(updateOrder);
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found ");
  }
});
export { addOrderItems, getOrderById, updateOrderToPaid };

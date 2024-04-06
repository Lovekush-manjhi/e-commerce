/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders
 *     responses:
 *       '200':
 *         description: A successful response with the list of orders
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: '60c3ad0565db4b00190c4d7b'
 *                   orderItems: [...]
 *                   shippingAddress1: 'No 45, Park Street'
 *                   shippingAddress2: 'No 46, Main Street'
 *                   city: 'Colombo'
 *                   zip: '10600'
 *                   country: 'Sri Lanka'
 *                   phone: '+94717185748'
 *                   status: 'Processing'
 *                   totalPrice: 200
 *                   user: '602e9b718e700335d8532b13'
 *                   dateOrdered: '2022-12-31T10:30:00.000Z'
 *       '404':
 *         description: No orders found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 'No orders found.'
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             orderItems: 
 *               - quantity: 3
 *                 product: '602e9c348e700335d8532b14'
 *               - quantity: 2
 *                 product: '602bde0161fcc409fc149734'
 *             shippingAddress1: 'No 45, Park Street'
 *             shippingAddress2: 'No 46, Main Street'
 *             city: 'Colombo'
 *             zip: '10600'
 *             country: 'Sri Lanka'
 *             phone: '+94717185748'
 *             user: '602e9b718e700335d8532b13'
 *     responses:
 *       '201':
 *         description: A successful response with the created order
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: '60c3ad0565db4b00190c4d7b'
 *                 orderItems: [...]
 *                 shippingAddress1: 'No 45, Park Street'
 *                 shippingAddress2: 'No 46, Main Street'
 *                 city: 'Colombo'
 *                 zip: '10600'
 *                 country: 'Sri Lanka'
 *                 phone: '+94717185748'
 *                 status: 'Processing'
 *                 totalPrice: 200
 *                 user: '602e9b718e700335d8532b13'
 *                 dateOrdered: '2022-12-31T10:30:00.000Z'
 *       '400':
 *         description: Bad Request - The order cannot be created
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 'The order cannot be created.'
 * 
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     description: Retrieve a single order by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       '200':
 *         description: A successful response with the order
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: '60c3ad0565db4b00190c4d7b'
 *                 orderItems: [...]
 *                 shippingAddress1: 'No 45, Park Street'
 *                 shippingAddress2: 'No 46, Main Street'
 *                 city: 'Colombo'
 *                 zip: '10600'
 *                 country: 'Sri Lanka'
 *                 phone: '+94717185748'
 *                 status: 'Processing'
 *                 totalPrice: 200
 *                 user: '602e9b718e700335d8532b13'
 *                 dateOrdered: '2022-12-31T10:30:00.000Z'
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 'Order not found.'
 *   put:
 *     summary: Update the status of an order by ID
 *     description: Update the status of an order by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: 'Shipped'
 *     responses:
 *       '200':
 *         description: A successful response with the updated order
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: '60c3ad0565db4b00190c4d7b'
 *                 orderItems: [...]
 *                 shippingAddress1: 'No 45, Park Street'
 *                 shippingAddress2: 'No 46, Main Street'
 *                 city: 'Colombo'
 *                 zip: '10600'
 *                 country: 'Sri Lanka'
 *                 phone: '+94717185748'
 *                 status: 'Shipped'
 *                 totalPrice: 200
 *                 user: '602e9b718e700335d8532b13'
 *                 dateOrdered: '2022-12-31T10:30:00.000Z'
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 'Order not found.'
 *   delete:
 *     summary: Delete an order by ID
 *     description: Delete an order by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       '200':
 *         description: A successful response with the message
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: 'The order and its items are deleted!'
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 'Order not found.'
 * 
 * /api/v1/orders/get/totalsales:
 *   get:
 *     summary: Get total sales
 *     description: Retrieve the total sales amount
 *     responses:
 *       '200':
 *         description: A successful response with the total sales
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 totalsales: 2000
 *       '400':
 *         description: Bad Request - The order sales cannot be generated
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 'The order sales cannot be generated'
 * 
 * /api/v1/orders/get/count:
 *   get:
 *     summary: Get total order count
 *     description: Retrieve the total number of orders
 *     responses:
 *       '200':
 *         description: A successful response with the total order count
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 orderCount: 10
 * 
 * /api/v1/orders/get/userorders/{userid}:
 *   get:
 *     summary: Get orders for a specific user
 *     description: Retrieve the orders for a specific user by user ID
 *     parameters:
 *       - in: path
 *         name: userid
 *         type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       '200':
 *         description: A successful response with the list of orders for the user
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: '60c3ad0565db4b00190c4d7b'
 *                   orderItems: [...]
 *                   shippingAddress1: 'No 45, Park Street'
 *                   shippingAddress2: 'No 46, Main Street'
 *                   city: 'Colombo'
 *                   zip: '10600'
 *                   country: 'Sri Lanka'
 *                   phone: '+94717185748'
 *                   status: 'Processing'
 *                   totalPrice: 200
 *                   user: '602e9b718e700335d8532b13'
 *                   dateOrdered: '2022-12-31T10:30:00.000Z'
 *               ...
 *       '404':
 *         description: No orders found for the user
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 'No orders found for the user.'
 */
const express = require("express");
const OrderItem = require("../models/order-item");
const Order = require("../models/order.js");
const router = express.Router();

// Update success response format
const successResponse = data => {
  return { success: true, data: data };
};

router.get(`/`, async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate("user", "name")
      .sort({ dateOrdered: -1 });

    if (!orderList || orderList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found." });
    }

    res.status(200).json(successResponse(orderList));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          populate: "category"
        }
      });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    res.status(200).json(successResponse(order));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const orderItemsIds = Promise.all(
      req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product
        });

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
      })
    );

    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrices = await Promise.all(
      orderItemsIdsResolved.map(async orderItemId => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
      orderItems: orderItemsIdsResolved,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.body.user
    });

    order = await order.save();

    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "The order cannot be created." });
    }

    res.status(201).json(successResponse(order));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    res.status(200).json(successResponse(order));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (order) {
      await Promise.all(
        order.orderItems.map(async orderItem => {
          await OrderItem.findByIdAndDelete(orderItem);
        })
      );
      return res
        .status(200)
        .json({
          success: true,
          message: "The order and its items are deleted!"
        });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/get/totalsales", async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } }
    ]);

    if (
      !totalSales ||
      totalSales.length === 0 ||
      !totalSales[0].hasOwnProperty("totalsales")
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "The order sales cannot be generated"
        });
    }

    const totalSalesValue = totalSales[0].totalsales;

    res.status(200).json(successResponse({ totalsales: totalSalesValue }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get(`/get/count`, async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();

    res.status(200).json(successResponse({ orderCount }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get(`/get/userorders/:userid`, async (req, res) => {
  try {
    const userOrderList = await Order.find({ user: req.params.userid })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          populate: "category"
        }
      })
      .sort({ dateOrdered: -1 });

    if (!userOrderList || userOrderList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for the user." });
    }

    res.status(200).json(successResponse(userOrderList));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

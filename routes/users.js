/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       '200':
 *         description: A successful response with the list of users
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with the user details
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: A successful response with the created user
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update a user with the provided details by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: A successful response with the updated user
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Log in a user with the provided email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *     responses:
 *       '200':
 *         description: A successful response with the user email and token
 *       '400':
 *         description: The user not found or password is wrong
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: A successful response with the created user
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with the message 'The user is deleted!'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/get/count:
 *   get:
 *     summary: Get user count
 *     description: Retrieve the count of all users
 *     responses:
 *       '200':
 *         description: A successful response with the user count
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *         phone:
 *           type: string
 *           description: User phone number
 *         isAdmin:
 *           type: boolean
 *           description: Indicates if the user is an admin
 *         street:
 *           type: string
 *           description: User street address
 *         apartment:
 *           type: string
 *           description: User apartment number
 *         zip:
 *           type: string
 *           description: User ZIP code
 *         city:
 *           type: string
 *           description: User city
 *         country:
 *           type: string
 *           description: User country
 */
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get all users
router.get("/", async (req, res) => {
  try {
    const userList = await User.find().select("-passwordHash");

    if (!userList) {
      return res
        .status(500)
        .json({ success: false, error: "Unable to retrieve users" });
    }

    res.send(userList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country
    });

    await user.save();

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Update user by ID
router.put("/:id", async (req, res) => {
  try {
    const userExist = await User.findById(req.params.id);
    let newPassword;

    if (req.body.password) {
      newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
      newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        passwordHash: newPassword,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
      },
      { new: true }
    );

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const secret = process.env.secret;

    if (!user) {
      return res.status(400).send("The user not found");
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin
        },
        secret,
        { expiresIn: "1d" }
      );

      res.status(200).send({ user: user.email, token: token });
    } else {
      res.status(400).send("Password is wrong!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// User registration
router.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country
    });

    await user.save();

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (deletedUser) {
      return res
        .status(200)
        .json({ success: true, message: "The user is deleted!" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
});

// Get user count
router.get("/get/count", async (req, res) => {
  try {
    const userCount = await User.countDocuments();

    if (!userCount) {
      return res
        .status(500)
        .json({ success: false, error: "Unable to retrieve user count" });
    }

    res.status(200).json({ success: true, userCount: userCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;

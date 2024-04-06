/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 * 
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories
 *     responses:
 *       200:
 *         description: A successful response with the list of categories
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: '60c3ad0565db4b00190c4d7a'
 *                   name: 'Electronics'
 *                   icon: 'icon-electronics'
 *                   color: '#4285F4'
 *       404:
 *         description: No categories found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 'No categories found.'
 * 
 *   post:
 *     summary: Create a new category
 *     description: Create a new category with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: 'Electronics'
 *             icon: 'icon-electronics'
 *             color: '#4285F4'
 *     responses:
 *       201:
 *         description: A successful response with the created category
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: '60c3ad0565db4b00190c4d7a'
 *                 name: 'Electronics'
 *                 icon: 'icon-electronics'
 *                 color: '#4285F4'
 *       400:
 *         description: Bad Request - The category cannot be created
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 'The category cannot be created.'
 * 
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     description: Retrieve a category by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: A successful response with the category
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: '60c3ad0565db4b00190c4d7a'
 *                 name: 'Electronics'
 *                 icon: 'icon-electronics'
 *                 color: '#4285F4'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 'Category not found.'
 * 
 *   put:
 *     summary: Update a category by ID
 *     description: Update a category with the provided details by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: 'Updated Electronics'
 *             icon: 'updated-icon-electronics'
 *             color: '#00FF00'
 *     responses:
 *       200:
 *         description: A successful response with the updated category
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: '60c3ad0565db4b00190c4d7a'
 *                 name: 'Updated Electronics'
 *                 icon: 'updated-icon-electronics'
 *                 color: '#00FF00'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 'Category not found.'
 * 
 *   delete:
 *     summary: Delete a category by ID
 *     description: Delete a category by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: A successful response with the message
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: 'The category is deleted!'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: 'Category not found!'
 */
const Category = require("../models/category");
const express = require("express");
const router = express.Router();
const errorHandler = require("../Database/error-handler");

router.get(`/`, async (req, res) => {
  try {
    const categoryList = await Category.find();

    if (!categoryList || categoryList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No categories found." });
    }

    res.status(200).json({ success: true, data: categoryList });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found." });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.post("/", async (req, res) => {
  try {
    let category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color
    });
    category = await category.save();

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "The category cannot be created." });
    }

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        icon: req.body.icon || category.icon,
        color: req.body.color
      },
      { new: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found." });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (category) {
      return res
        .status(200)
        .json({ success: true, message: "The category is deleted!" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Category not found!" });
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

module.exports = router;

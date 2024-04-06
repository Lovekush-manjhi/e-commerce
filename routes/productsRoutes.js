/**
 * @swagger
 * tags:
 *   name: Search
 *   description: API for searching products
 */

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for products
 *     description: Retrieve products based on the provided search term and category
 *     parameters:
 *       - in: query
 *         name: term
 *         description: Search term
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         description: Product category
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with the list of products matching the search criteria
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: '60c3ad0565db4b00190c4d7b'
 *                   name: 'Product 1'
 *                   description: 'Description of Product 1'
 *                   richDescription: 'Rich description of Product 1'
 *                   image: 'http://example.com/public/uploads/product1.jpg'
 *                   brand: 'Brand 1'
 *                   price: 100
 *                   category: '602e9b718e700335d8532b13'
 *                   countInStock: 10
 *                   rating: 4.5
 *                   numReviews: 20
 *                   isFeatured: true
 *               ...
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: 'Internal Server Error'
 */
const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");

router.get("/", async (req, res) => {
  try {
    // Retrieve the search term and category from the request query
    const searchTerm = req.query.term;
    const category = req.query.category;

    console.log("Search Term:", searchTerm);
    console.log("Category:", category);

    let query = {};

    // If a search term is provided, add a search condition for both name and description fields
    if (searchTerm) {
      query = {
        $or: [
          { name: { $regex: `.*${searchTerm}.*`, $options: "i" } },
          { description: { $regex: `.*${searchTerm}.*`, $options: "i" } }
        ]
      };
    }

    // If a category is provided, add a condition for the category field
    if (category) {
      query.category = category;
    }

    // Retrieve products based on the query
    const products = await Product.find(query);

    console.log("Search Results:", products);

    // If no results are found and a search term is provided, save a new product
    if (products.length === 0 && searchTerm) {
      const newProduct = new Product({
        name: searchTerm,
        description: searchTerm,
        richDescription: `${searchTerm} - rich description`,
        brand: searchTerm,
        price: parseFloat(searchTerm) || 0,
        rating: parseFloat(searchTerm) || 0,
        isFeatured: Boolean(searchTerm),
        countInStock: parseInt(searchTerm) || 0,
        numReviews: parseInt(searchTerm) || 0,
        dateCreated: new Date(),
        category: category || undefined
      });

      try {
        // Check if the 'category' field is provided before saving
        if (category) {
          newProduct.category = category;
        }

        const savedProduct = await newProduct.save();
        console.log("Saved Product:", savedProduct);

        // Add the saved product to the response
        products.push(savedProduct);
      } catch (error) {
        console.error("Error saving product:", error);
        return res
          .status(500)
          .json({ success: false, error: "Error saving product" });
      }
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;

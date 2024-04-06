const { Product } = require("../models/product");
const express = require("express");
const Category = require("../models/category");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function(req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
});

const uploadOptions = multer({ storage: storage });

const generateErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ success: false, error: message });
};

router.get(`/`, async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }

    const productList = await Product.find(filter).populate("category");

    if (!productList) {
      generateErrorResponse(res, 500, "Internal Server Error");
    }
    res.send(productList);
  } catch (error) {
    generateErrorResponse(res, 500, "Internal Server Error");
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      generateErrorResponse(res, 404, "Product not found");
    }
    res.send(product);
  } catch (error) {
    generateErrorResponse(res, 500, "Internal Server Error");
  }
});

router.post(`/`, uploadOptions.single("image"), async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);

    if (!category) {
      generateErrorResponse(res, 400, "Invalid Category");
    }

    const file = req.file;
    if (!file) {
      generateErrorResponse(res, 400, "No image in the request");
    }

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: `${basePath}${fileName}`,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured
    });

    product = await product.save();

    if (!product) {
      generateErrorResponse(res, 500, "The product cannot be created");
    }

    res.send(product);
  } catch (error) {
    generateErrorResponse(res, 500, "Internal Server Error");
  }
});

router.put("/:id", uploadOptions.single("image"), async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      generateErrorResponse(res, 400, "Invalid Product Id");
    }

    const category = await Category.findById(req.body.category);
    if (!category) {
      generateErrorResponse(res, 400, "Invalid Category");
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      generateErrorResponse(res, 400, "Invalid Product");
    }

    const file = req.file;
    let imagepath;

    if (file) {
      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
      imagepath = `${basePath}${fileName}`;
    } else {
      imagepath = product.image;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: imagepath,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
      },
      { new: true }
    );

    if (!updatedProduct) {
      generateErrorResponse(res, 500, "The product cannot be updated");
    }

    res.send(updatedProduct);
  } catch (error) {
    generateErrorResponse(res, 500, "Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (product) {
      res.status(200).json({
        success: true,
        message: "The product is deleted!"
      });
    } else {
      generateErrorResponse(res, 404, "Product not found");
    }
  } catch (error) {
    generateErrorResponse(res, 500, "Internal Server Error");
  }
});

router.get(`/get/count`, async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.send({
      productCount: productCount
    });
  } catch (error) {
    generateErrorResponse(res, 500, "Internal Server Error");
  }
});

router.get(`/get/featured/:count`, async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+count);

    if (!products) {
      generateErrorResponse(res, 500, "Internal Server Error");
    }
    res.send(products);
  } catch (error) {
    generateErrorResponse(res, 500, "Internal Server Error");
  }
});

router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 10),
  async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        generateErrorResponse(res, 400, "Invalid Product Id");
      }

      const files = req.files;
      let imagesPaths = [];
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

      if (files) {
        files.map(file => {
          imagesPaths.push(`${basePath}${file.filename}`);
        });
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          images: imagesPaths
        },
        { new: true }
      );

      if (!product) {
        generateErrorResponse(res, 500, "The gallery cannot be updated");
      }

      res.send(product);
    } catch (error) {
      generateErrorResponse(res, 500, "Internal Server Error");
    }
  }
);

module.exports = router;

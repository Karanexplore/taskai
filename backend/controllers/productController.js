const Product = require("../models/Product");

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, sort } = req.query;

    let filter = {};
    let sortOption = {};

    if (category) {
      filter.category = category;
    }

    if (sort === "low") {
      sortOption.discountPrice = 1;
    } else if (sort === "high") {
      sortOption.discountPrice = -1;
    } else if (sort === "newest") {
      sortOption.createdAt = -1;
    } else if (sort === "popularity") {
      sortOption.rating = -1;
    }

    const products = await Product.find(filter).sort(sortOption);
    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET /api/products/:id
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Get Single Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      discountPrice,
      image,
      category,
      description,
      rating,
      isNewArrival,
      isTopSelling,
      dressStyle,
      reviews,
      sizes,
      colors,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Product name is required" });
    }

    const newProduct = new Product({
      name,
      price: Number(price),
      discountPrice: Number(discountPrice),
      image,
      category,
      description,
      rating: Number(rating) || 4.5,
      reviews: Number(reviews) || 0,

      // ✅ IMPORTANT FIX
      isNewArrival:
        typeof isNewArrival === "boolean" ? isNewArrival : false,
      isTopSelling:
        typeof isTopSelling === "boolean" ? isTopSelling : false,

      // ✅ auto fallback
      dressStyle: dressStyle || category || "Casual",

      sizes: Array.isArray(sizes) ? sizes : [],
      colors: Array.isArray(colors) ? colors : [],
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
      price: req.body.price ? Number(req.body.price) : undefined,
      discountPrice: req.body.discountPrice
        ? Number(req.body.discountPrice)
        : undefined,
      rating: req.body.rating ? Number(req.body.rating) : undefined,
      reviews: req.body.reviews ? Number(req.body.reviews) : undefined,
    };

    if (!updatedData.dressStyle && updatedData.category) {
      updatedData.dressStyle = updatedData.category;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
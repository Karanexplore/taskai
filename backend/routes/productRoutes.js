// const express = require("express");
// const router = express.Router();

// const {
//   getProducts,
//   getSingleProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../controllers/productController");

// router.get("/", getProducts);
// router.get("/:id", getSingleProduct);
// router.post("/", createProduct);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.get("/:id", getSingleProduct);

// Protected routes
router.post("/", authMiddleware, createProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
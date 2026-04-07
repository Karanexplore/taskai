const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const Category = require("../models/Category");
const products = require("../seed/products");

dotenv.config();
connectDB();

const categories = [
  { name: "Casual", image: "" },
  { name: "Formal", image: "" },
  { name: "Party", image: "" },
  { name: "Gym", image: "" },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();

    await Product.insertMany(products);
    await Category.insertMany(categories);

    console.log("Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.error("Seed Error:", error);
    process.exit(1);
  }
};

importData();
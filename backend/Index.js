const port = process.env.PORT || 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

// Create upload folder if not exists
const uploadDir = "uploads/images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://rnamdev715:010203123@cluster0.io9xyyv.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

// Multer storage
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Static image access
app.use("/images", express.static(uploadDir));

// Image upload route
app.post("/uploads", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Product Schema and Route
const Product = mongoose.model("product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    id = products[products.length - 1].id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    date: req.body.date,
  });

  try {
    await product.save();
    console.log("Product added:", product.name);
    res.json({
      success: 1,
      message: "Product added successfully",
      name: req.body.name,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: 0, message: "Error saving product", error });
  }
});

// creating API for deleting Products

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product deleted:", req.body.id);
  res.json({
    success: 1,
    message: "Product deleted successfully",
    id: req.body.id,
  });
});

// creating API for getting all Products

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  // console.log("Products fetched:", products);
  if (products.length > 0) {
    res.send(products);
  }
});

// schema creating for user model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating endpoint for registration of the user.

app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email or password",
    });
  }

  let cart = {};

  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    token,
  });
});

// creating endpoint for user login

app.post("/login", async (req, res) => {
  let user = await Users.findOne({
    email: req.body.email,
  });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({ success: false, error: "wrong password" });
    }
  } else {
    res.json({
      success: false,
      errors: "wrong email id",
    });
  }
});

// creating endpoint for new collections data

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newCollections = products.slice(1).slice(-8);
  // console.log("new collections fetched");
  res.send(newCollections);
});

// creating endpoint for popular in woman

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  // console.log("Popular in women fetched");
  res.send(popular_in_women);
});

// creating middle ware

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Please authenticate using a valid token" });
    }
  }
};

// creating endpoints for adding products in cart data

app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("added");
});

// creating endpoint for remobing products from cart data

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("removed");
});

// creating endpoint for getting cart data
app.post("/cartdata", fetchUser, async (req, res) => {
  console.log("get cart data");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Server start
app.listen(port, (err) => {
  if (err) {
    console.log("Error in starting the server");
  } else {
    console.log(`Server started on http://localhost:${port}`);
  }
});

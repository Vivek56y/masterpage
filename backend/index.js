const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./Models/db");
const authRouter = require("./routes/authrouter");
const productRouter=require("./routes/productRouter");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products",productRouter);

app.get("/", (req, res) => {
  res.status(200).json({ ok: true, message: "Backend is running" });
});

app.get("/ping", (req, res) => {
  res.status(200).send("PONG");
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
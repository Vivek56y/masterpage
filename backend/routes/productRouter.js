const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    success: true,
    message: "Products fetched successfully",
    products: [
      { id: "p1", name: "Wireless Mouse", price: 499, category: "Accessories" },
      { id: "p2", name: "Mechanical Keyboard", price: 2499, category: "Accessories" },
      { id: "p3", name: "USB-C Cable", price: 199, category: "Cables" },
    ],
  });
});

module.exports = router;
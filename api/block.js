const express = require("express");
const router = express.Router();

// @route   GET api/block/test
// @desc    Tests block route
// @access  Public
router.get("/:blockHeight", (req, res) =>
  res.json({ block: `Block ${blockHeight}` })
);

// @route   POST api/users/login
// @desc    Login user / Returning JWT
// @access  Public
router.post("/", (req, res) =>
  res.json({ message: "New block added to chain" })
);
module.exports = router;

const express = require("express");
const router = express.Router();
const Blockchain = require("../blockchain/Blockchain");

// @route   GET /block/:blockHeight
// @desc    Retrieve block from database
// @access  Public
router.get("/:blockHeight", (req, res) => {
  Blockchain.getBlock(req.params.blockHeight)
    .then(block => {
      res.json(block);
    })
    .catch(err =>
      res.json({ NotFoundError: `Key ${blockHeight} not found in database` })
    );
});

// @route   POST /block
// @desc    Tests block route
// @access  Public
router.post("/", (req, res) =>
  res.json({ message: "New block added to chain" })
);

module.exports = router;

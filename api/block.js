const express = require("express");
const router = express.Router();
const Blockchain = require("../blockchain/Blockchain");
const Block = require("../blockchain/Block");

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
// @desc    Add block to database
// @access  Public
router.post("/", (req, res) => {
  Blockchain.addBlock(new Block(req.query.body))
    .then(block => res.json(block))
    .catch(err => res.json(err));
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Blockchain = require("../blockchain/Blockchain");
const Block = require("../blockchain/Block");
const toHex = require("../helpers/toHex");

// @route   GET /block/:blockHeight
// @desc    Retrieve block from database
// @access  Public
router.get("/:blockHeight", (req, res) => {
  Blockchain.getBlock(req.params.blockHeight)
    .then(block => {
      res.json(block);
    })
    .catch(err => res.json({ NotFoundError: `Key ${blockHeight} not found in database` }));
});

// @route   POST /block
// @desc    Add block to database
// @access  Public
router.post("/", (req, res) => {
  let { address, star } = req.body;
  let { validatedAddresses } = req.app.locals;

  // Check if address is validated
  if (validatedAddresses[address]) {
    let { ra, dec } = star;
    let story = toHex(star.story);
    // Define block body
    let body = {
      address,
      star: { ra, dec, story }
    };
    // Create block with defined body
    Blockchain.addBlock(new Block(body))
      .then(block => res.json(block))
      .catch(err => res.json(err));
  } else {
    res.json({ NotFoundError: `Address ${address} not found in validated addresses` });
  }
});

module.exports = router;

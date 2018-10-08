const express = require("express");
const router = express.Router();
const Blockchain = require("../blockchain/Blockchain");
const hexToString = require("../helpers/hexToString");

// @route   GET /stars/hash/:HASH
// @desc    Retrieve entire star block with story decoded
// @access  Public
router.get("/hash:HASH", (req, res) => {
  const hash = req.params.HASH.substring(1);
  Blockchain.getBlockByHash(hash)
    .then(block => {
      block.body.star.storyDecoded = hexToString(block.body.star.story);
      res.json(block);
    })
    .catch(err => res.json({ NotFoundError: `Key ${hash} not found in database` }));
});

// @route   GET /stars/address/:ADDRESS
// @desc    Retrieve multiple star blocks by their addresses
// @access  Public
router.get("/address:ADDRESS", (req, res) => {
  const address = req.params.ADDRESS.substring(1);
  Blockchain.getBlocksByAddress(address)
    .then(blocks => {
      blocks.forEach(block => {
        block.body.star.storyDecoded = hexToString(block.body.star.story);
      });
      res.json(blocks);
    })
    .catch(err => res.json({ NotFoundError: `Address ${address} not found in database` }));
});

module.exports = router;

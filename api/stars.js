const express = require("express");
const router = express.Router();
const Blockchain = require("../blockchain/Blockchain");
const hexToString = require("../helpers/hexToString");

// @route   GET /hash/:hash
// @desc    Retrieve entire star block with story decoded
// @access  Public
router.get("/hash/:hash", (req, res) => {
  const { hash } = req.params;
  Blockchain.getBlockByHash(hash)
    .then(block => {
      block.body.star.storyDecoded = hexToString(block.body.star.story);
      res.json(block);
    })
    .catch(err => res.json({ NotFoundError: `Key ${hash} not found in database` }));
});

module.exports = router;

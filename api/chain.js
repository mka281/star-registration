const express = require("express");
const router = express.Router();

const Blockchain = require("../blockchain/Blockchain");

// @route   GET /chain
// @desc    Retrieve cbain from database
// @access  Public
router.get("/", (req, res) => {
  Blockchain.getChain()
    .then(chain => res.json({ chain }))
    .catch(err => res.json(err));
});

module.exports = router;

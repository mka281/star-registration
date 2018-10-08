const express = require("express");
const router = express.Router();
const Blockchain = require("../blockchain/Blockchain");
const Block = require("../blockchain/Block");
const stringToHex = require("../helpers/stringToHex");
const hexToString = require("../helpers/hexToString");

// @route   GET /block/:blockHeight
// @desc    Retrieve block with story decoded from database
// @access  Public
router.get("/:blockHeight", (req, res) => {
  Blockchain.getBlock(req.params.blockHeight)
    .then(block => {
      block.body.star.storyDecoded = hexToString(block.body.star.story);
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
    let { ra, dec, story } = star;
    // Check if star.ca && star.dec && star.story exist
    if (ra && dec && story) {
      story = stringToHex(story);
      if (story == false) {
        res.json({ NotFoundError: `Story must include only ASCII characters, limited to 500` });
      }
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
      res.json({ NotFoundError: `You must provide star object with ra, dec and story fields` });
    }
  } else {
    res.json({ NotFoundError: `Address ${address} not found in validated addresses` });
  }
});

module.exports = router;

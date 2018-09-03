const express = require("express");
const router = express.Router();
const bitcoin = require("bitcoinjs-lib");
const bitcoinMessage = require("bitcoinjs-message");

// @route   POST /signature/request
// @desc    Request signature message
// @access  Public
router.post("/request", (req, res) => {
  let { validationRequests } = req.app.locals;
  let { address } = req.body;
  let timestamp = new Date()
    .getTime()
    .toString()
    .slice(0, -3);
  let message = `${address}:${timestamp}:starRegistry`;
  let validationWindow = 300;

  // Add wallet address and remaining time to global validationRequests object
  validationRequests[address] = [validationWindow, timestamp];

  res.json({
    address,
    timestamp,
    message,
    validationWindow
  });
});

// @route   POST /signature/validate
// @desc    Validate signature
// @access  Public
router.post("/validate", (req, res) => {
  let { validationRequests, validatedAddresses } = req.app.locals;
  let { address, signature } = req.body;

  // Check if address in validationRequests object
  if (validationRequests[address]) {
    let timestamp = validationRequests[address][1];
    let message = `${address}:${timestamp}:starRegistry`;
    let validationWindow = validationRequests[address][0];

    // Verify signature
    let registerStar = bitcoinMessage.verify(message, address, signature);

    let messageSignature;
    if (registerStar) {
      messageSignature = "valid";
      // Add address to validated address object
      validatedAddresses[address] = true;
    } else {
      messageSignature = "invalid";
    }
    res.json({
      registerStar,
      status: {
        address,
        timestamp,
        message,
        validationWindow,
        messageSignature
      }
    });
  } else {
    res.json({ NotFoundError: `Address ${address} not found` });
  }
});

module.exports = router;

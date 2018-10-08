const express = require("express");
const router = express.Router();
const bitcoin = require("bitcoinjs-lib");
const bitcoinMessage = require("bitcoinjs-message");

// @route   POST /signature/request
// @desc    Request signature message
// @access  Public
router.post("/requestValidation", (req, res) => {
  let { validationRequests } = req.app.locals;
  let { address } = req.body;
  let requestTimeStamp;
  let validationWindow;
  if (validationRequests[address]) {
    requestTimeStamp = validationRequests[address][1];
    validationWindow = validationRequests[address][0];
  } else {
    requestTimeStamp = new Date()
      .getTime()
      .toString()
      .slice(0, -3);
    validationWindow = 300;

    // Add wallet address and remaining time to global validationRequests object
    validationRequests[address] = [validationWindow, requestTimeStamp];
  }
  let message = `${address}:${requestTimeStamp}:starRegistry`;

  res.json({
    address,
    requestTimeStamp,
    message,
    validationWindow
  });
});

// @route   POST /signature/validate
// @desc    Validate signature
// @access  Public
router.post("/message-signature/validate", (req, res) => {
  let { validationRequests, validatedAddresses } = req.app.locals;
  let { address, signature } = req.body;

  // Check if address in validationRequests object
  if (validationRequests[address]) {
    let requestTimestamp = validationRequests[address][1];
    let message = `${address}:${requestTimestamp}:starRegistry`;
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
        requestTimestamp,
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

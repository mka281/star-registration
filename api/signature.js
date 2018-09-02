const express = require("express");
const router = express.Router();

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
  validationRequests[address] = validationWindow;

  res.json({
    address,
    timestamp,
    message,
    validationWindow
  });
});

module.exports = router;

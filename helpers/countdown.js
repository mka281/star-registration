// Used in app.js
module.exports = validationRequests => {
  let countDown = () => {
    Object.keys(validationRequests).forEach(key => {
      validationRequests[key][0]--;
      // console.log(validationRequests);
      if (validationRequests[key][0] == 0) {
        delete validationRequests[key];
        // console.log(validationRequests);
      }
    });
  };
  setInterval(countDown, 1000);
};

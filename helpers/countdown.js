module.exports = validationRequests => {
  let countDown = () => {
    Object.keys(validationRequests).forEach(key => {
      validationRequests[key]--;
      // console.log(validationRequests);
      if (validationRequests[key] == 290) {
        delete validationRequests[key];
        // console.log(validationRequests);
      }
    });
  };
  setInterval(countDown, 1000);
};

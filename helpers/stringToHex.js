// Used in POST /block route
module.exports = str => {
  // return false if story is more than 500 bytes
  if (str.length > 500) {
    return false;
  }

  let hex = "";
  for (let i = 0; i < str.length; i++) {
    // return false if there is non-ascii character
    if (str.charCodeAt(i) > 127) {
      return false;
    }

    hex += "" + str.charCodeAt(i).toString(16);
  }
  return hex;
};

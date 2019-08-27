module.exports = function(text) {
  return String(text).replace(/\s+/g, "-").toLowerCase();
};

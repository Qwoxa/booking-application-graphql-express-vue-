/**
 * Converts the int date to ISO String date
 * @param {Number} intDate
 * @returns {String}
 */
const toISOString = intDate => new Date(intDate).toISOString();

module.exports = {
  toISOString,
};

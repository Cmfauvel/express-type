/** @format */

const { handleError } = require('../helpers/error');

module.exports = (err, req, res, next) => {
  handleError(err, res);
  // console.error(err.stack)

  // res.status(500).send('Something broke!')
}
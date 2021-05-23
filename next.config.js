const withImages = require('next-images')
module.exports = withImages({
  env: { SERVER: "https://ciwin-telegram.herokuapp.com/v1" }
})
const withImages = require('next-images')
module.exports = withImages({
  env: { SERVER: "http://localhost:2500/v1" }
})
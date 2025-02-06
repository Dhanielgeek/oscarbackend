const jwt = require("jsonwebtoken")

const signJwt = (tokenData) =>{
  return jwt.sign({email: tokenData.email, role: tokenData.role, name: tokenData.name},
    process.env.OSCARNEWMAN_ADMIN_TOKEN, {expiresIn: "2d"})
}

module.exports = {signJwt}
const jwt = require("jsonwebtoken");
const User = require('./models/userModel.js')

exports.verifyToken = async (req, res, next) => {
  try {
    let token;
    //token is not present
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ status: "failed", message: "please login to continue" });
    }
    //split bearer and jwt token
    if (req.headers.authorization.startsWith("Bearer ")) 
      token = req.headers.authorization.split(" ")[1];
    else 
      return res.status(401).json({ error: "Invalid token" });

    //regenerate token from secret adn check if it is valid
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verified) {
      return res.status(403).json({ status: "failed", message: "forbidden" });
    }

    req.user = await User.findById(verified.email);;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal server error",
    });
  }
};

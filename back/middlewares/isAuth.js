import jwt from "jsonwebtoken";
import {userModel} from '../models/index.js'

const verifyToken = async function(req, res, next) {
  let bearerToken;
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];

    if (bearer[0] !== "Bearer") {
      console.log('Bearer token not understood');
      return res.status(403).send("Bearer token not understood");
    }

    // Verify if the token is valid
    jwt.verify(bearerToken, "this is my secret key", async function(err, decoded) {
      if (err) {
        console.log("Verification error:", err);
        if (err.name === "TokenExpiredError") {
          console.log('Session timed out, please login again');
          return res.status(403).send("Session timed out, please login again");
        } else {
          console.log('Authentication error');
          return res.status(403).send("Authentication error");
        }
      }

      // Find user by decoded id
      try {
        const user = await userModel.findAll({ where: { id: decoded.user.id } });
        if (user) {
          req.user = user[0].dataValues;
          next();
        } else {
          console.log('User not found');
          return res.status(403).send("User not found");
        }
      } catch (error) {
        console.log('Error finding user:', error);
        return res.status(500).send("Internal Server Error");
      }
    });

  } else {
    console.log('No token provided');
    return res.status(403).send("Unauthorized!");
  }
};

export default verifyToken

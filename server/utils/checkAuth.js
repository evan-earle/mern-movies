import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next({ status: 401, message: "Unauthorized" });
  }
  return jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return next({ status: 401, message: "Invalid token" });
    } else {
      req.user = decoded;
      return next();
    }
  });
};

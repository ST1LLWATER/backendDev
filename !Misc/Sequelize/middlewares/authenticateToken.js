require("dotenv").config();

function authenticateToken(req, res, next) {
  console.log(req.cookies);
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = data.userId;
    req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
}

module.exports = authenticateToken;

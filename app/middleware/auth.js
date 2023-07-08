const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
   const token = req.header("Authorization");
   if (!token) {
      res.send("rejected ......");
   }
   try {
      const decoded = jwt.verify(token, "privet");
      req.user = decoded;
      console.log(decoded);

      next();
   } catch (error) {
      res.status(400).send("worng token .....");
   }
};

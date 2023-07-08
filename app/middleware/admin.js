module.exports = function (req, res, next) {
   if (!req.user.isAdmain) {
      return res.send("your not admin ......");
   }
   next();
};

const bcrypt = require("bcrypt");

function Encryption(req) {
   const saltRounds = 10;
   const salt = bcrypt.genSaltSync(saltRounds);
   const reuslt = bcrypt.hashSync(req, salt);
   return reuslt;
}

async function checkUser(password, hash) {
   const match = await bcrypt.compare(password, hash);
   return match;
}

exports.Encryption = Encryption;
exports.checkUser = checkUser;

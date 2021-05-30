const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Calc = mongoose.model('Calc')
const { jwtkey } = require('../keys')

module.exports = (req, res, next) => {
   const { authorization } = req.headers;
  //  //authorization === Bearer sfafsafa
  //  if(!authorization){
  //      return res.status(401).send({error:"you must be logged in"})
  //  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwtkey, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "you must be logged in 2" })
    }
    const { userId } = payload;
    const calc = await Calc.findById(userId)
    req.calc = calc;
    next();
  }
  )
}
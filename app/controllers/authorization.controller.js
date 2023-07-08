const db = require('../models');
const serves = require('../services/serversUser');
const User = db.user;

exports.findUser = async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        await User.findOne({ email: req.body.email })
          .then((data) => {
            res.send(data);
            console.log(data);
          
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                'Some error occurred while retrieving calenders.',
            });
          });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }

  //   try {
  //     let user = await User.findOne({ email: req.body.email });
  //     const match = req.body.password === user.password;
  //     if (!user) {
  //       res.status(404).send('Invalid email ');
  //     }
  //     if (!match) {
  //       res.status(404).send('invalid passwor');
  //     }
  //     // const token = user.token();
  //     // const newToken = (user.auth = token);
  //     // user.save(newToken);
  //     // res.header("Authorization", newToken);
  //     res.send('Login completed successfully');
  //   } catch (error) {
  //     res.status(404).send('user not found');
  //     console.log('user not found');
  //   }
};

exports.getUser = async (req, res) => {
  const email = await req.body.email;
  try {
    await User.findOne({ email: email })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving calenders.',
        });
      });
  } catch (error) {
    console.log(error);
  }
};

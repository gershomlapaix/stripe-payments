const User = require("./../models/userModel");

exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const newUser = await User.create({
    names: `${firstName} ${lastName}`,
    email,
    password,
    phone
  });
};

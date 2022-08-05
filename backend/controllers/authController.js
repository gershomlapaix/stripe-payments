const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

// a function to sign a token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_SECRET_KEY_EXPIRY_TIME,
  });
};

// a function to create a token to a signed in or up user
const createToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  //   configure the cookies
  const cookieOptions = {
    // days in milliseconds
    expires: new Date(
      Date.now() + process.env.JWT_SECRET_KEY_EXPIRY_TIME * 26 * 3600 * 1000
    ),

    /**
     * to help in mitigating the risk of client side script accessing the protected cookie
     *  it can not be modified by the browser in any way
     * */
    httpOnly: true,
    // to be sent on encrypted requests(HTTPS)
    secure: process.env.NODE_ENV === "production" ? true : false,
  };

  //   set the cookie
  res.cookie("payJwt", token, cookieOptions);

  //  remove the password from the output; provide the output to the user,
  user.password = undefined;
  res.status(statusCode).send({
    status: "success",
    token,
    user,
  });
};

exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  try {
    const newUser = await User.create({
      names: `${firstName} ${lastName}`,
      email,
      password,
      phone,
    });

    createToken(newUser, 201, res);
  } catch (err) {
    res.send(err)
    console.error(err);
  }
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new Error("Provide email and password"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(user.password, password))) {
      return next(new Error("Incorrect email or password"));
    }

    createToken(user, 200, res);
  } catch (error) {
    res.send(error)
    console.error(error);
  }
};

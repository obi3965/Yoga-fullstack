const User = require("../models/user");

exports.signup = async (req, res) => {
  const { email } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(403).json({
        error: "Email is already exist",
      });
    }
    const user = new User(req.body);
    const token = user.getJwtToken();
    await user.save();
    user.password = undefined;

    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      err: error,
    });
  }
};

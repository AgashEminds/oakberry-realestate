const Users = require("../model/userSchema");
const { encryptData, decryptData } = require("../LIB/index");
const { privatekey } = require("../config/config");
const refreshkey = process.env.REFRESH_KEY;
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password, email,images } = req.body;
  try {
    let user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const encryptedPassword = encryptData(password);
    console.log(encryptedPassword);

    user = new Users({
      username,
      email,
      password: encryptedPassword,
      images,
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const decryptedPassword = decryptData(user.password);
    console.log(decryptedPassword);
    if (decryptedPassword !== password) {
      return res.status(400).json({ msg: "Password incorrect" });
    }

    const payload = { user: user._id };
    const token = jwt.sign(payload, privatekey, {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign(payload, refreshkey, {
      expiresIn: "2m",
    });

    res.json({ token, refreshToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

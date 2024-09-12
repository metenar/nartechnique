import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Register" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //check the user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User not found" });
    //check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Cradentials" });
    //return the user cookie token
    const age = 1000 * 60 * 60 * 24 * 7; //7 days for expiration date
    // creating token
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: age }
    );
    const { password: userPassword, email, ...userInfo } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: age,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
};
export const logout = (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logout succesfully" });
};

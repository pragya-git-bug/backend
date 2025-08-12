import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const updateMyProfile = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select("-password");
  res.json(updated);
};

export const deleteMyProfile = async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: "Profile deleted" });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

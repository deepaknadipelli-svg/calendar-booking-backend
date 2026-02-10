const userService = require('../service/user.service');

exports.handleCreateUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.handleGetUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

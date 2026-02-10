const User = require('../model/user.model');

class UserService {
  async createUser(data) {
    return await User.create(data);
  }

  async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('NOT_FOUND: User not found');
    return user;
  }
}

module.exports = new UserService();

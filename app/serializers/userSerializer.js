class UserSerializer {
  static serialize(user) {
    if (!user) return null;
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
      // Add more fields as needed
    };
  }

  static serializeMany(users) {
    if (!Array.isArray(users)) return [];
    return users.map(user => this.serialize(user));
  }
}

module.exports = UserSerializer;

/*
Example usage:


const user = {
  id: 1,
  username: 'john_doe',
  email: 'john@example.com',
  createdAt: new Date(),
  updatedAt: new Date()
};

console.log(UserSerializer.serialize(user));

const users = [user, { ...user, id: 2, username: 'jane_doe' }];
console.log(UserSerializer.serializeMany(users));
*/
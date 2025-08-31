class UserResponse {
  constructor(user, token = null) {
    this.id = user._id;
    this.username = user.name;
    this.email = user.email;
    this.role = user.role;
    this.createdAt = user.createdAt;

    // UserProfile fields
    this.phone = user.phone || null;
    this.address = user.address || {};
    this.gender = user.gender || null;
    this.farmDetails = user.farmDetails || null;
    this.buyerPreferences = user.buyerPreferences || null;

    if (token) {
      this.token = token; // only add token if provided
    }
  }
}

module.exports = UserResponse;

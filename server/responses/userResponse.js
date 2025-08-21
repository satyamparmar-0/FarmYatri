// const User = require("../../models/User");

class UserResponse {
    constructor(user, token = null) {
        this.id = user._id;
        this.username = user.name;
        this.email = user.email;
        this.role = user.role;
        this.createdAt = user.createdAt;
        if (token) {
            this.token = token; // only add token if provided
        }
    }
}
module.exports = UserResponse;


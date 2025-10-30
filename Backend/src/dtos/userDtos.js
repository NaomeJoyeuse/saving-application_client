class UserDTO {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.fullName = data.fullName;
    this.createdAt = data.createdAt;
  }
}

class AuthResponseDTO {
  constructor(token, user) {
    this.token = token;
    this.user = new UserDTO(user);
  }
}

module.exports = { UserDTO, AuthResponseDTO };
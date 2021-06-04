class AuthService {
  loginSucceed(credentials) {
    sessionStorage.setItem("authenticatedUser", JSON.stringify(credentials));
  }

  loginFailed() {
    sessionStorage.removeItem("authenticatedUser");
  }

  logoutSucceed() {
    sessionStorage.removeItem("authenticatedUser");
  }

  logoutFailed() {
    sessionStorage.removeItem("authenticatedUser");
  }

  isLoggedIn() {
    const user = this.GetUser();
    return user != null;
  }

  getUser() {
    const user = JSON.parse(sessionStorage.getItem("authenticatedUser"));
    return user;
  }
}

export default new AuthService();

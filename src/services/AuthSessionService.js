class AuthService {
  loginSucceed(credentials) {
    sessionStorage.setItem("authenticatedAccount", JSON.stringify(credentials));
  }

  loginFailed() {
    sessionStorage.removeItem("authenticatedAccount");
  }

  logoutSucceed() {
    sessionStorage.removeItem("authenticatedAccount");
  }

  logoutFailed() {
    sessionStorage.removeItem("authenticatedAccount");
  }

  isLoggedIn() {
    const account = this.getAccount();
    return account != null;
  }

  getAccount() {
    const account = JSON.parse(sessionStorage.getItem("authenticatedAccount"));
    return account;
  }
}

export default new AuthService();

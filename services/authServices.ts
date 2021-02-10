class AuthServices {
  getUserLocalStorage() {
    const data = window.localStorage.getItem("user");
    if (typeof data === "object" && data === null) {
      return {};
    }
    return JSON.parse(data);
  }

  setUserLocalStorage(data: { username: string; token: string }) {
    const { username, token } = data;
    window.localStorage.setItem("user", JSON.stringify({ username, token }));
  }

  removeUserLocalStorage() {
    window.localStorage.removeItem("user");
  }
}

export default new AuthServices();

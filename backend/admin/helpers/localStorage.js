const { LocalStorage } = require("node-localstorage");

module.exports = {
  setItem: (token) => {
    const localStorage = new LocalStorage("./scratch");
    localStorage.setItem("token", token);
  },
  getItem: () => {
    const localStorage = new LocalStorage("./scratch");
    const token = localStorage.getItem("token");
    return token;
  },
};

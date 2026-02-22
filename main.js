document.addEventListener("DOMContentLoaded", function () {

  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "dashboard.html";
    });
  }

  // PROTECT DASHBOARD
  if (window.location.pathname.includes("dashboard.html")) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "login.html";
    }
  }

  // AUTO REDIRECT IF LOGGED IN
  if (
    window.location.pathname.includes("login.html") ||
    window.location.pathname.includes("index.html")
  ) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      window.location.href = "dashboard.html";
    }
  }

  // LOGOUT
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "login.html";
    });
  }

});
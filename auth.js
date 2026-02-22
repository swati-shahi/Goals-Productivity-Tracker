// -------------------- SIGNUP --------------------
function signupUser(event) {
    event.preventDefault(); // stop page refresh

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    // Save user data in localStorage
    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("boostlyUser", JSON.stringify(user));

    alert("Account created successfully!");
    window.location.href = "login.html";
}


// -------------------- LOGIN --------------------
function loginUser(event) {
    event.preventDefault(); // stop page refresh

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem("boostlyUser"));

    if (!storedUser) {
        alert("No account found. Please sign up first.");
        return;
    }

    if (email === storedUser.email && password === storedUser.password) {
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password");
    }
}


// -------------------- DASHBOARD PROTECTION --------------------
function checkAuth() {
    const storedUser = localStorage.getItem("boostlyUser");

    if (!storedUser) {
        window.location.href = "login.html";
    }
}


// -------------------- LOGOUT --------------------
function logoutUser() {
    localStorage.removeItem("boostlyUser");
    window.location.href = "login.html";
}

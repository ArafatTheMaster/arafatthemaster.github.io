 document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');

    if (isLoggedIn === 'true' && userType) {
        if (userType === 'admin') {
            showAdminSection();
        } else if (userType === 'free') {
            redirectToFreePage();
        }
    }
});

function showAdminSection() {
    document.getElementById('loggedInSection').style.display = 'block';
    document.querySelector('.login-box').style.display = 'none';
    document.getElementById('backgroundSection').style.display = 'none';
}

function redirectToFreePage() {
    window.location.href = "free-user.html"; // Replace with your actual free user page URL
}

function validateForm(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var validCredentials = [
        { username: "admin", password: "Web&CEO@1234", userType: "admin" },
        { username: "user1", password: "111", userType: "free" },
        { username: "user2", password: "222", userType: "free" },
        { username: "1767560658", password: "1767560658", userType: "admin" },
        { username: "Sakib42", password: "Hayabusa1300@", userType: "free" },
        { username: "admin2", password: "AdminPassword2", userType: "admin" },
        { username: "admin3", password: "AdminPassword3", userType: "admin" },
        { username: "user3", password: "333", userType: "free" },
    ];

    var user = validCredentials.find(function (credential) {
        return credential.username === username && credential.password === password;
    });

    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', user.userType);

        if (user.userType === 'admin') {
            displaySuccessPopup();
        } else if (user.userType === 'free') {
            redirectToFreePage();
        }
    } else {
        Swal.fire({
            title: "Invalid Credentials",
            text: "The username or password you entered is incorrect.",
            icon: "error",
            confirmButtonText: "OK"
        });
    }
}

function displaySuccessPopup() {
    Swal.fire({
        title: "UNLOCKED",
        text: "Premium Subscription is active!",
        icon: "success",
        confirmButtonText: "Premium Service"
    }).then(showAdminSection);
}

function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var checkbox = document.getElementById("showPasswordCheckbox");

    if (checkbox.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    location.reload();
}
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formSuccess = document.getElementById("formSuccess");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let isValid = true;
    clearErrors();

    const namePattern = /^[A-Za-z\s]{3,}$/;
    if (!namePattern.test(nameInput.value.trim())) {
        showError(nameInput, nameError,
            "Name must be at least 3 letters and contain only letters.");
        isValid = false;
    } else {
        showSuccess(nameInput);
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, emailError,
            "Please enter a valid email address.");
        isValid = false;
    } else {
        showSuccess(emailInput);
    }

    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordPattern.test(passwordInput.value)) {
        showError(passwordInput, passwordError,
            "Password must be 8+ chars, include uppercase, lowercase, number & special character.");
        isValid = false;
    } else {
        showSuccess(passwordInput);
    }

    if (isValid) {
        formSuccess.style.color = "green";
        formSuccess.textContent = "Form submitted successfully!";
        form.reset();
    }
});

function showError(input, errorElement, message) {
    input.classList.add("error-input");
    errorElement.textContent = message;
}

function showSuccess(input) {
    input.classList.add("success-input");
}

function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    formSuccess.textContent = "";

    nameInput.classList.remove("error-input", "success-input");
    emailInput.classList.remove("error-input", "success-input");
    passwordInput.classList.remove("error-input", "success-input");
}

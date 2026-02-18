document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const themeToggle = document.getElementById("themeToggle");
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const formSuccess = document.getElementById("formSuccess");

    if (hamburger) {
        hamburger.addEventListener("click", function(e) {
            e.stopPropagation();
            navLinks.classList.toggle("active");
        });
    }

    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove("active");
        }
    });


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains('dark');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let isValid = true;
        clearErrors();

        const nameValue = nameInput.value.trim();
        const namePattern = /^[A-Za-z\s]{3,}$/;
        
        if (!namePattern.test(nameValue)) {
            showError(nameInput, nameError, "اسمك محتاج يكون ٣ حروف على الأقل");
            isValid = false;
        } else {
            showSuccess(nameInput);
        }

        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(emailValue)) {
            showError(emailInput, emailError, "الإيميل مش صحيح - جرب حاجة زي name@company.com");
            isValid = false;
        } else {
            showSuccess(emailInput);
        }

        const passwordValue = passwordInput.value;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if (!passwordPattern.test(passwordValue)) {
            showError(passwordInput, passwordError, "الباسورد محتاج حرف كبير وصغير ورقم ورمز");
            isValid = false;
        } else {
            showSuccess(passwordInput);
        }

        if (isValid) {
            formSuccess.style.color = "#059669";
            formSuccess.textContent = "✅ Thanks! We'll contact you within 24 hours";
            form.reset();
            
            setTimeout(() => {
                formSuccess.textContent = "";
                clearSuccessInputs();
            }, 3000);
        }
    });

    // Helper functions
    function showError(input, errorElement, message) {
        input.classList.add("error-input");
        input.classList.remove("success-input");
        errorElement.textContent = message;
    }

    function showSuccess(input) {
        input.classList.add("success-input");
        input.classList.remove("error-input");
    }

    function clearErrors() {
        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        formSuccess.textContent = "";
    }

    function clearSuccessInputs() {
        nameInput.classList.remove("success-input");
        emailInput.classList.remove("success-input");
        passwordInput.classList.remove("success-input");
    }

    // Clear errors when typing
    [nameInput, emailInput, passwordInput].forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error-input');
            if (this.id === 'name') nameError.textContent = '';
            if (this.id === 'email') emailError.textContent = '';
            if (this.id === 'password') passwordError.textContent = '';
        });
    });


    document.querySelector('.btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.features').scrollIntoView({
            behavior: 'smooth'
        });
    });

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 25, 41, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#0a1929';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });
});
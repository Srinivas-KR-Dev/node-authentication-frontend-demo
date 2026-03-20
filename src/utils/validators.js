const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const fullnameRegex = /^[A-Za-z ]{3,40}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

const validateRegisterForm = ({ user, fullname, email, password, confirmPassword }) => {
    const errors = {};

    if (!user.trim()) {
        errors.user = 'Username is required';
    } else if (!usernameRegex.test(user.trim())) {
        errors.user = 'Username must be 3 to 20 characters and use letters, numbers, or underscore';
    }

    if (!fullname.trim()) {
        errors.fullname = 'Full name is required';
    } else if (!fullnameRegex.test(fullname.trim())) {
        errors.fullname = 'Full name should contain only letters and spaces';
    }

    if (!email.trim()) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(email.trim())) {
        errors.email = 'Please enter a valid email address';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
        errors.password = 'Password must include uppercase, lowercase, number, special character, and 8 characters';
    }

    if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};

const validateLoginForm = ({ user, password }) => {
    const errors = {};

    if (!user.trim()) {
        errors.user = 'Username is required';
    } else if (!usernameRegex.test(user.trim())) {
        errors.user = 'Enter a valid username';
    }

    if (!password) {
        errors.password = 'Password is required';
    }

    return errors;
};

export { validateRegisterForm, validateLoginForm };

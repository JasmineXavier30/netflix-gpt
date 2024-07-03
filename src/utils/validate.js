export const validateSignInFormData = (email, password) => {
    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
    const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if (!isValidEmail) return "Email is not valid";
    if (!isValidPassword) return "Password is not valid";

    return null;
}
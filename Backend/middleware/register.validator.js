const { body, validationResult } = require("express-validator");

// 1. Define the rules based on auth.model.js
const validateRegister = [
    // Validate Name (Required String)
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required.")
        .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters.")
        .escape(),

    // Validate Email (Required String, Unique format)
    // Note: Checking if it's 'unique' in the DB must be done in your controller, 
    // but we can ensure it's a valid email format here.
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Please provide a valid email address.")
        .normalizeEmail(),

    // Validate Password (Required String)
    body("password")
        .notEmpty().withMessage("Password is required.")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long.")
        .matches(/\d/).withMessage("Password must contain at least one number.")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter."),

    // Validate Contact (Required String)
    // Assuming this is a phone number. You can adjust the length requirement based on your country's format.
    body("contact")
        .trim()
        .notEmpty().withMessage("Contact number is required.")
        .isNumeric().withMessage("Contact must contain only numbers.")
        .isLength({ min: 10, max: 15 }).withMessage("Contact number must be between 10 and 15 digits."),

    // Validate Role (String, Enum: ['buyer', 'seller'])
    // We make this optional in the validator because your schema has a default value ('buyer').
    // But IF they provide it, it MUST be one of those two exact words.
    body("role")
        .optional()
        .isIn(['buyer', 'seller']).withMessage("Role must be either 'buyer' or 'seller'.")
];

// 2. Create the error-checking middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Validation failed", 
            errors: errors.array() 
        });
    }
    
    next();
};

module.exports = { validateRegister, handleValidationErrors };
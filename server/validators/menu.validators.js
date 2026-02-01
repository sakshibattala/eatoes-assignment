import { body } from "express-validator";

export const createMenuItemValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["Appetizer", "Main Course", "Dessert", "Beverage"])
    .withMessage("Invalid category"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("ingredients")
    .optional()
    .isArray()
    .withMessage("Ingredients must be an array of strings"),

  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be boolean"),

  body("preparationTime")
    .optional()
    .isNumeric()
    .withMessage("Preparation time must be numeric"),

  body("imageUrl")
    .optional()
    .isString()
    .withMessage("Image URL must be string"),
];

export const updateAvailabilityStatus = [
  body("isAvailable")
    .not()
    .isEmpty()
    .withMessage("isAvailable field is required")
    .isBoolean()
    .withMessage("isAvailable must be true or false"),
];

export const updateMenuItemValidator = [
  body("name").optional().isString().withMessage("Name must be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("category")
    .optional()
    .isIn(["Appetizer", "Main Course", "Dessert", "Beverage"])
    .withMessage("Invalid category value"),

  body("price").optional().isNumeric().withMessage("Price must be a number"),

  body("ingredients")
    .optional()
    .isArray()
    .withMessage("Ingredients must be an array of strings"),

  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be true or false"),

  body("preparationTime")
    .optional()
    .isNumeric()
    .withMessage("Preparation time must be a number"),

  body("imageUrl")
    .optional()
    .isString()
    .withMessage("imageUrl must be a string"),
];

const { checkSchema } = require("express-validator");

const validateSignup = checkSchema({
  
  companyName: {
    isString: {
      bail: true,
    },
    isLength: {
      options: { min: 1 },
    },
    custom: {
      options: (value) => value.length === value.trim().length,
    },
  },
  email: {
    isEmail: true,
    bail: true,
  },
  password: {
    isString: {
      bail: true,
    },
    isLength: {
      options: { min: 8 },
    },
    custom: {
      options: (value) => value.length === value.trim().length,
    },
  },
});

module.exports = validateSignup;

const { checkSchema } = require("express-validator");

const validateLogin = checkSchema({
  email: {
    isEmail: {
        bail: true,
    }
  },
  password: {
    isString: {
      bail: true,
    },
  },
});

module.exports = validateLogin;

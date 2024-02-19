const { checkSchema } = require("express-validator");

const validateVacancy = checkSchema({
    position: {
        isString: {
            bail: true,
    }
  },
    location: {
        isString: {
            bail: true,
        },
    },
    startDate: {
        isString: {
            bail: true
        }
    },
  });

module.exports = validateVacancy;
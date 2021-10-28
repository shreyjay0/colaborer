const { validationResult, checkSchema } = require("express-validator/check");
const Colaborer = require("../models/Colaborer");

module.exports = {
  validate(method) {
    switch (method) {
      case "addColaborer": {
        return checkSchema({
          uname: {
            in: ["body"],
            exists: {
              errorMessage: "Please fill your username",
            },
            isEmpty: {
              errorMessage: "This field is required",
              negated: true,
            },
            isLength: {
              errorMessage: "Username should be at least 5 characters long",
              options: { min: 5 },
            },
            custom: {
              options: async (uval) => {
                const clbr = await Colaborer.find({ uname: uval });
                if (clbr.length) {
                  return Promise.reject(
                    new Error(
                      "This username is already registered. Try logging in."
                    )
                  );
                }
              },
            },
          },
          name: {
            in: ["body"],
            exists: {
              errorMessage: "Please fill your name",
            },
            isEmpty: {
              errorMessage: "This field is required",
              negated: true,
            },
          },
          email: {
            in: ["body"],
            exists: {
              errorMessage: "Please fill your email",
            },
            isEmpty: {
              errorMessage: "This field is required",
              negated: true,
            },
            custom: {
              options: async (uval) => {
                const clbr = await Colaborer.find({ email: uval });
                if (clbr.length) {
                  return Promise.reject(
                    new Error(
                      "This email is already registered. Try logging in."
                    )
                  );
                }
              },
            },
          },
        });
      }
    }
  },

  addColaborer(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).send({ errors: errors.array() });
    }

    const { uname, name, email } = req.body;
    Colaborer.create({ uname, name, email, status: "enabled" })
      .then((colaborer) => res.status(200).send({ data: colaborer }))
      .catch((err) =>
        res.status(500).send({
          errors: err,
          message: "Something went wrong",
        })
      );
  },
};

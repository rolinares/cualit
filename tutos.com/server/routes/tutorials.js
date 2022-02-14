const express = require("express");
const router = express.Router();
const tutorials = require("../services/tutorials");
const auth = require("../middleware/auth");
const { validationResult } = require("express-validator");
const { validate } = require("../middleware/tutorialsValidation");

/* GET tutorials. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await tutorials.getMultiple(req.query.filter));
  } catch (err) {
    console.error(`Error while getting tutorials `, err.message);
    next(err);
  }
});

/* GET token. */
router.get("/token", async function (req, res, next) {
  try {
    res.json(await tutorials.getToken());
  } catch (err) {
    console.error(`Error while getting token `, err.message);
    next(err);
  }
});

/* GET tutorials by id. */
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await tutorials.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting tutorial `, err.message);
    next(err);
  }
});

/* POST tutorials */
router.post("/", auth, validate("create"), async function (req, res, next) {
  try {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    res.json(await tutorials.create(req.body));
  } catch (err) {
    console.error(`Error while creating tutorial`, err.message);
    next(err);
  }
});

/* PUT tutorial */
router.put("/:id", validate("update"), async function (req, res, next) {
  try {
    res.json(await tutorials.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating tutorial`, err.message);
    next(err);
  }
});

/* DELETE tutorials */
router.delete("/mass_delete", async function (req, res, next) {
  try {
    res.json(await tutorials.removeAll());
  } catch (err) {
    console.error(`Error while deleting tutorials`, err.message);
    next(err);
  }
});

/* DELETE tutorial */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await tutorials.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting tutorial`, err.message);
    next(err);
  }
});

module.exports = router;

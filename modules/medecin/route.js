/** @format */

const express = require("express");
const router = express.Router();
const controller = require("./controller");
const auth = require("./auth")

router.post("/auth/register", auth.register);

// router.put();

// router.delete();

router.get("/medecins/:id", controller.findOne);

module.exports = router;
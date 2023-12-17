const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller")

router.route("/register").post(authControllers.register)
router.route("/astrologers").get(authControllers.astro)
router.route("/:id").put(authControllers.updateAstro)
router.route("/:id").get(authControllers.getAstroById)

module.exports = router
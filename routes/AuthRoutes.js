const {register, login} = require("../controllers/AuthControllers");
const { checkUser } = require("../middlewares/AuthMiddlewares");

const router = require("express").Router();

router.post("/checkUser", checkUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
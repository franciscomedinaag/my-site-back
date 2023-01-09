const { register, login, secretInfo, checkUser } = require("../controllers/AuthControllers");
const { checkUserMiddleware } = require("../middlewares/AuthMiddlewares");

const router = require("express").Router();

router.post("/checkUser", checkUser);
router.post("/register", register);
router.post("/login", login);

router.get("/secretInfo", checkUserMiddleware, secretInfo);

module.exports = router;
const { register, login, secretInfo, checkIfUserIsAuth } = require("../controllers/AuthControllers");
const { checkUserMiddleware } = require("../middlewares/AuthMiddlewares");

const router = require("express").Router();

router.post("/checkIfUserIsAuth", checkIfUserIsAuth);
router.post("/register", register);
router.post("/login", login);

router.get("/secretInfo", checkUserMiddleware, secretInfo);

module.exports = router;
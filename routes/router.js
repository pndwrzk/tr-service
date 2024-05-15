const express = require("express");
const authController = require("../controllers/authController");
const customerController = require("../controllers/customerController");
const verifyToken = require("../middlewares/verifyToken");
const generatePagging = require("../middlewares/generatePagging");

const router = express.Router();

router.post("/login", authController.login);
router.post("/refersh-token", authController.refershAccessToken);
router.post("/register", authController.register);

const apiRoute = router.use("/api", router);

apiRoute.get(
  "/customer",
  generatePagging,
  verifyToken,
  customerController.retriveAll
);
apiRoute.post("/customer", verifyToken, customerController.create);
apiRoute.delete("/customer/:id", verifyToken, customerController.destroy);
apiRoute.get("/customer/:id", verifyToken, customerController.retrive);
apiRoute.put("/customer/:id", verifyToken, customerController.update);

module.exports = router;

const express = require("express");
const nhaXuatBanController = require("../controllers/NhaXuatBan.controller");

const router = express.Router();

router.route("/")
    .get(nhaXuatBanController.findAll)
    .post(nhaXuatBanController.create)
    .delete(nhaXuatBanController.deleteAll);

router.route("/:id")
    .get(nhaXuatBanController.findOne)
    .put(nhaXuatBanController.update)
    .delete(nhaXuatBanController.delete);

module.exports = router;

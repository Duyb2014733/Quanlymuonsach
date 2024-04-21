const express = require("express");
const docGiaController = require("../controllers/docgia.controller");

const router = express.Router();

router.route("/")
    .get(docGiaController.findAll)
    .post(docGiaController.create)
    .delete(docGiaController.deleteAll);

router.route("/:id")
    .get(docGiaController.findOne)
    .put(docGiaController.update)
    .delete(docGiaController.delete);

module.exports = router;

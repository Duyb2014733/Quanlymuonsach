const express = require("express");
const theoDoiMuonSachController = require("../controllers/TheoDoiMuonSach.controller");

const router = express.Router();

router
  .route("/")
  .get(theoDoiMuonSachController.findAll)
  .post(theoDoiMuonSachController.create)
  .delete(theoDoiMuonSachController.deleteAll);

router
  .route("/:id")
  .get(theoDoiMuonSachController.findOne)
  .put(theoDoiMuonSachController.update)
  .delete(theoDoiMuonSachController.delete);

module.exports = router;

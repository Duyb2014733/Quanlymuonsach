const TheoDoiMuonSachService = require("../services/theodoimuonsach.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body.MaDocGia || !req.body.MaSach) {
    return next(new ApiError(400, "MaDocGia and MaSach can not be empty"));
  }

  try {
    const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
    const document = await theoDoiMuonSachService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the borrowing record")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
    documents = await theoDoiMuonSachService.find({});
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving borrowing records")
    );
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
    const document = await theoDoiMuonSachService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Borrowing record not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving borrowing record with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
    const document = await theoDoiMuonSachService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Borrowing record not found"));
    }
    return res.send({ message: "Borrowing record was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating borrowing record with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
    const document = await theoDoiMuonSachService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Borrowing record not found"));
    }
    return res.send({ message: "Borrowing record was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete borrowing record with id=${req.params.id}`)
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
    const deleteCount = await theoDoiMuonSachService.deleteAll();
    return res.send({
      message: `${deleteCount} borrowing records were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while removing all borrowing records")
    );
  }
};

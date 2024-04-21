const express = require("express");
const cors = require("cors");
const docGiaRouter = require("./app/router/DocGia.route");
const nhanVienRouter = require("./app/router/NhanVien.route");
const nhanXuatBanRouter = require("./app/router/NhaXuatBan.route");
const sachRouter = require("./app/router/Sach.route");
const theoDoiMuonSachRouter = require("./app/router/TheoDoiMuonSach.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});
app.use("/api/docgia", docGiaRouter);

app.use("/api/nhanvien", nhanVienRouter);

app.use("/api/nhaxuatban", nhanXuatBanRouter);

app.use("/api/sach", sachRouter);

app.use("/api/theodoimuonsach", theoDoiMuonSachRouter);

app.use((req, res, next) => {

    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;